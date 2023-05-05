import codecs
import collections.abc
import logging
from typing import Any, Dict, List, Tuple, Union

import numpy as np
import pandas as pd
import torch
from torch.utils.data import Dataset

from llm_studio.src.datasets.text_utils import get_texts, get_tokenizer

logger = logging.getLogger(__name__)


class CustomDataset(Dataset):
    """Base PyTorch dataset for any problem type."""

    def __init__(self, df: pd.DataFrame, cfg: Any, mode: str = "train"):
        """
        Args:
            df: input DataFrame
            cfg: config with all the hyperparameters
            mode: dataset mode. One of {"train", "validation"}
        """

        self.cfg = cfg
        self.mode = mode
        self.df = df.copy()

        assert self.mode in [
            "train",
            "validation",
        ], f"There is no {self.mode} for the datasets"

        # Get the labels
        has_all_columns = cfg.dataset.answer_column in self.df.columns
        has_missing_values = False
        if has_all_columns:
            has_missing_values = (
                self.df.shape[0]
                != self.df[[cfg.dataset.answer_column]].dropna().shape[0]
            )

        if not has_all_columns or has_missing_values:
            if has_missing_values:
                message = (
                    f"The {self.mode} DataFrame"
                    f" column {cfg.dataset.answer_column}"
                    " contain missing values."
                )
            else:
                message = (
                    f"The {self.mode} DataFrame "
                    "does not contain the required column:"
                    f" {cfg.dataset.answer_column}."
                )

            raise ValueError(message)

        self.tokenizer = get_tokenizer(cfg)

        self.prompts = get_texts(df, self.cfg, separator="")
        self.answers = (
            self.df[self.cfg.dataset.answer_column].astype(str).values.tolist()
        )

        self.parent_ids = None
        if self.cfg.dataset.parent_id_column != "None":
            if "id" not in self.df.columns:
                logger.warning(
                    f"When using parent column, the dataframe requires an 'id' column. "
                    f"Disabling functionality for mode {self.mode}."
                )
            else:
                self.parent_ids = self.df[self.cfg.dataset.parent_id_column].values
                self.df_id_to_idx = {v: k for k, v in enumerate(self.df["id"].values)}

        self.prompts = [self.parse_prompt(cfg, prompt) for prompt in self.prompts]

        if self.cfg.environment._local_rank == 0:
            logger.info(f"Sample prompt: {self.prompts[0]}")

    @staticmethod
    def parse_prompt(cfg: Any, prompt: str):
        prompt = (
            f"{codecs.decode(cfg.dataset.text_prompt_start, 'unicode_escape')}{prompt}"
        )
        if cfg.dataset.add_eos_token_to_prompt:
            prompt += cfg._tokenizer_eos_token
        prompt = (
            f"{prompt}"
            f"{codecs.decode(cfg.dataset.text_answer_separator, 'unicode_escape')}"
        )
        return prompt

    def __len__(self) -> int:
        return len(self.df)

    @staticmethod
    def get_input_columns(cfg: Any) -> Tuple[str, ...]:
        """Assigns the input columns

        Args:
            cfg: config

        """
        if isinstance(cfg.dataset.prompt_column, tuple):
            return cfg.dataset.prompt_column
        return (cfg.dataset.prompt_column,)

    @staticmethod
    def batch_to_device(
        batch: Union[Dict, List, torch.Tensor], device: str
    ) -> Union[Dict, List, torch.Tensor, str]:
        """Function to send the batch to the device specified

        Args:
            batch: input batch
            device: device to send the data to
        Returns:
            batch with the elements on the device specified
        """
        if isinstance(batch, torch.Tensor):
            return batch.to(device)
        elif isinstance(batch, collections.abc.Mapping):
            return {
                key: CustomDataset.batch_to_device(value, device)
                for key, value in batch.items()
            }
        elif isinstance(batch, collections.abc.Sequence):
            return [CustomDataset.batch_to_device(value, device) for value in batch]
        else:
            raise ValueError(f"Can not move {type(batch)} to device.")

    @staticmethod
    def preprocess_dataframe(df: pd.DataFrame, cfg: Any, mode: str) -> pd.DataFrame:
        """
        Preprocesses the input dataframe

        Args:
            df: the full training dataframe
            cfg: config
            mode: the mode. One of {"train", "validation"}
        Returns:
            the processed dataframe
        """

        return df

    def get_train_collate_fn(self):
        """
        Returns train batch collate function for the PyTorch Dataloader.
        By default returns None that uses the default PyTorch collate
        """

        return None

    def get_validation_collate_fn(self):
        """
        Return validation batch collate function for the PyTorch Dataloader.
        By default returns None that uses the default PyTorch collate
        """

        return None

    def postprocess_batch_predictions(
        self, cfg: Any, input_batch: Dict, output: Dict
    ) -> Dict:
        predicted_text = [
            self.tokenizer.decode(ids, skip_special_tokens=True).strip()
            for ids in output["predicted_answer_ids"]
        ]
        output["predicted_text"] = np.array(predicted_text)
        del output["predicted_answer_ids"]

        return output

    @staticmethod
    def clean_output(
        output: Dict,
        prompts: List[str],
        cfg: Any,
    ):
        output["predicted_text"] = output["predicted_text"].tolist()
        for j in range(len(output["predicted_text"])):
            curr_text = output["predicted_text"][j].strip()
            for stop_token in cfg.tokenizer._stop_words:
                if curr_text.find(stop_token) != -1:
                    curr_text = curr_text[: curr_text.find(stop_token)]
            output["predicted_text"][j] = curr_text.strip()

        return output

    def postprocess_output(self, cfg, df: pd.DataFrame, output: Dict) -> Dict:
        output = self.clean_output(output, self.prompts, cfg)

        output["target_text"] = self.answers
        metric_func, _ = cfg.prediction.metric_class.get(cfg.prediction.metric)
        predictions = output["predicted_text"]
        labels = output["target_text"]
        assert len(predictions) == len(labels)

        metrics = []

        if "GPT" in cfg.prediction.metric:
            metrics, explanations = metric_func(
                cfg,
                {"predicted_text": predictions, "target_text": labels},
                df,
                raw_results=True,
            )
            output["explanations"] = explanations
        else:
            for i in range(len(labels)):
                label = [labels[i]]
                prediction = [predictions[i]]
                act_metric = metric_func(
                    cfg,
                    {"predicted_text": prediction, "target_text": label},
                    df.iloc[i : i + 1],
                )
                metrics.append(act_metric)
        output["metrics"] = torch.tensor(metrics)

        return output

    def format_output(
        self, cfg, df: pd.DataFrame, output: Dict
    ) -> Tuple[Dict, pd.DataFrame]:
        output = {
            key: value
            for key, value in output.items()
            if key not in ["loss", "target", "losses"]
        }

        output.pop("target_text", None)

        output["predicted_text"] = np.array(output["predicted_text"])

        if isinstance(cfg.dataset.prompt_column, tuple):
            for col in cfg.dataset.prompt_column:
                output[col] = df[col].values
        else:
            output[cfg.dataset.prompt_column] = df[cfg.dataset.prompt_column].values
        df[f"pred_{cfg.dataset.answer_column}"] = output["predicted_text"]

        return output, df

    @classmethod
    def sanity_check(cls, df: pd.DataFrame, cfg: Any, mode: str = "train"):
        """
        Quick check whether Dataframe and configurations are correctly set.
        """
        pass

    def __getitem__(self, idx: int) -> Dict:
        """Returns a single dataset item."""

        sample: Dict = dict()

        # Read data
        sample = self._read_data(idx=idx, sample=sample)

        return sample

    def _get_sample(self, idx):
        prompt = self.prompts[idx]
        answer = self.answers[idx]

        prompt_encodings = self.encode(
            self.tokenizer, prompt, self.cfg.tokenizer.max_length_prompt, "left"
        )["input_ids"]
        if self.cfg.dataset.add_eos_token_to_answer:
            max_length_answer = self.cfg.tokenizer.max_length_answer - 1
        else:
            max_length_answer = self.cfg.tokenizer.max_length_answer
        answer_encodings = self.encode(
            self.tokenizer, answer, max_length_answer, "right"
        )["input_ids"]
        if self.cfg.dataset.add_eos_token_to_answer:
            answer_encodings = torch.cat(
                [
                    answer_encodings,
                    torch.Tensor([self.tokenizer.eos_token_id]),
                ],
                dim=0,
            )
        return [prompt_encodings, answer_encodings]

    def _read_data(self, idx: int, sample: Dict) -> Dict:
        """Reads a single text observation."""

        samples = [self._get_sample(idx)]

        if self.parent_ids is not None:
            parent_idx = idx
            while (
                parent_idx := self.df_id_to_idx.get(self.parent_ids[parent_idx], None)
            ) is not None:
                if (
                    self.mode == "train"
                    and np.random.random()
                    < self.cfg.augmentation.skip_parent_probability
                ):
                    break
                samples.insert(0, self._get_sample(int(parent_idx)))

        if (
            self.mode == "train"
            and np.random.random() < self.cfg.augmentation.random_parent_probability
        ):
            rnd_idx = np.random.randint(len(self))
            samples.insert(0, self._get_sample(int(rnd_idx)))

        input_ids = torch.cat([torch.cat(sample) for sample in samples])
        prompt_mask = torch.cat(
            [
                torch.cat([torch.ones_like(sample[0]), torch.zeros_like(sample[1])])
                for sample in samples
            ]
        ).to(torch.bool)
        attention_mask = torch.ones_like(input_ids)

        labels = input_ids.clone()

        if self.cfg.dataset.mask_prompt_labels:
            labels.masked_fill_(prompt_mask, -100)
        if self.cfg.dataset.add_eos_token_to_answer:
            # eos_token may be equal to pad_token. Add the label back manually.
            labels[-1] = self.tokenizer.eos_token_id

        if self.cfg.tokenizer.max_length < len(input_ids):
            labels = labels[-self.cfg.tokenizer.max_length :]

        sample["labels"] = torch.full((self.cfg.tokenizer.max_length,), -100)
        sample["labels"][-len(labels) :] = labels

        sample.update(
            self.pad_tokens(
                input_ids,
                attention_mask,
                self.cfg.tokenizer.max_length,
                self.tokenizer.pad_token_id,
            )
        )

        samples[-1][1] = torch.empty(0)
        prompt_input_ids = torch.cat([torch.cat(sample) for sample in samples])
        prompt_attention_mask = torch.ones_like(prompt_input_ids)

        sample.update(
            self.pad_tokens(
                prompt_input_ids,
                prompt_attention_mask,
                self.cfg.tokenizer.max_length_prompt,
                self.tokenizer.pad_token_id,
                prefix="prompt_",
            )
        )

        return sample

    def pad_tokens(
        self, input_ids, attention_mask, max_length, pad_token_id, prefix=""
    ):
        sample = {}

        if max_length < len(input_ids):
            input_ids = input_ids[-max_length:]
            attention_mask = attention_mask[-max_length:]

        sample[f"{prefix}input_ids"] = torch.full((max_length,), pad_token_id)
        sample[f"{prefix}input_ids"][-len(input_ids) :] = input_ids
        sample[f"{prefix}attention_mask"] = torch.zeros(max_length)
        sample[f"{prefix}attention_mask"][-len(input_ids) :] = attention_mask
        return sample

    @staticmethod
    def encode(tokenizer, text: str, max_length: int, truncation_side: str) -> Dict:
        encodings = tokenizer(text, return_tensors="pt", add_special_tokens=False)
        encodings["input_ids"] = encodings["input_ids"][0]
        encodings["attention_mask"] = encodings["attention_mask"][0]
        if truncation_side == "right":
            encodings["input_ids"] = encodings["input_ids"][:max_length]
            encodings["attention_mask"] = encodings["attention_mask"][:max_length]
        else:
            encodings["input_ids"] = encodings["input_ids"][-max_length:]
            encodings["attention_mask"] = encodings["attention_mask"][-max_length:]
        return encodings
