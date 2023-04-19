from typing import Any

from transformers import AutoTokenizer


def get_texts(df, cfg, separator=None):
    if isinstance(cfg.dataset.prompt_column, str):
        # single column dataset
        texts = df[cfg.dataset.prompt_column].astype(str)
        texts = texts.values
    else:
        # multi-column dataset - prepend (if necessary) and join
        columns = list(cfg.dataset.prompt_column)

        for column in columns:
            df[column] = df[column].astype(str)

        if separator is None:
            if hasattr(cfg.dataset, "separator") and len(cfg.dataset.separator):
                separator = cfg.dataset.separator
            else:
                separator = getattr(cfg, "_tokenizer_sep_token", "<SEPARATOR>")

        join_str = f" {separator} "
        texts = df[columns].astype(str)
        texts = texts.apply(lambda x: join_str.join(x), axis=1).values

    return texts


def get_tokenizer(cfg: Any):
    tokenizer = AutoTokenizer.from_pretrained(
        cfg.llm_backbone,
        add_prefix_space=cfg.tokenizer.add_prefix_space,
        use_fast=True,
    )
    tokenizer.padding_side = getattr(
        cfg.tokenizer, "_padding_side", tokenizer.padding_side
    )
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    if tokenizer.cls_token is None:
        tokenizer.cls_token = tokenizer.eos_token
    if tokenizer.sep_token is None:
        tokenizer.sep_token = " "
    if hasattr(cfg.dataset, "separator") and len(cfg.dataset.separator):
        cfg._tokenizer_sep_token = cfg.dataset.separator
    else:
        cfg._tokenizer_sep_token = tokenizer.sep_token
    if tokenizer.unk_token_id is not None:
        cfg._tokenizer_mask_token_id = tokenizer.unk_token_id
    elif tokenizer.mask_token_id is not None:
        cfg._tokenizer_mask_token_id = tokenizer.mask_token_id
    elif tokenizer.mask_token_id is not None:
        cfg._tokenizer_mask_token_id = tokenizer.pad_token_id
    else:
        # setting the mask token id to the last token in the vocabulary
        # this usually is a safe choice and mostly refers to eos token
        cfg._tokenizer_mask_token_id = len(tokenizer) - 1

    cfg._tokenizer_eos_token = tokenizer.eos_token

    cfg.tokenizer._stop_words_ids = []
    if len(cfg.prediction.stop_tokens) > 0:
        for stop_word in cfg.prediction.stop_tokens:
            if stop_word in tokenizer.all_special_tokens:
                cfg.tokenizer._stop_words_ids.append(
                    tokenizer(stop_word, return_tensors="pt", add_special_tokens=True)[
                        "input_ids"
                    ][0]
                )
            else:
                cfg.tokenizer._stop_words_ids.append(
                    tokenizer(stop_word, return_tensors="pt", add_special_tokens=False)[
                        "input_ids"
                    ][0]
                )

    return tokenizer
