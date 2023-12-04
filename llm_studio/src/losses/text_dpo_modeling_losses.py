import logging
from typing import Any, KeysView, Tuple

import torch
import torch.nn.functional as F
from torch import nn

__all__ = ["Losses"]

logger = logging.getLogger(__name__)


class DPOLoss(nn.Module):
    """
    Implementation based upon
    https://github.com/eric-mitchell/direct-preference-optimization
    """

    def __init__(self, cfg: Any):
        super().__init__()
        self.cfg = cfg

    def forward(
        self,
        policy_chosen_logps: torch.FloatTensor,
        policy_rejected_logps: torch.FloatTensor,
        reference_chosen_logps: torch.FloatTensor,
        reference_rejected_logps: torch.FloatTensor,
    ) -> Tuple[torch.FloatTensor, torch.FloatTensor, torch.FloatTensor]:
        """Compute the DPO loss for a batch of policy and reference model log probabilities.
        Args:
            policy_chosen_logps: Log probabilities of the policy model for the chosen responses. Shape: (batch_size,)
            policy_rejected_logps: Log probabilities of the policy model for the rejected responses. Shape: (batch_size,)
            reference_chosen_logps: Log probabilities of the reference model for the chosen responses. Shape: (batch_size,)
            reference_rejected_logps: Log probabilities of the reference model for the rejected responses. Shape: (batch_size,)
            beta: Temperature parameter for the DPO loss, typically something in the range of 0.1 to 0.5. We ignore the reference model as beta -> 0.
        Returns:
            DPO loss
        """
        pi_logratios = policy_chosen_logps - policy_rejected_logps
        ref_logratios = reference_chosen_logps - reference_rejected_logps

        losses = self.get_losses(logits=pi_logratios - ref_logratios)
        chosen_rewards = (
            self.cfg.training.beta
            * (policy_chosen_logps - reference_chosen_logps).detach()
        )
        rejected_rewards = (
            self.cfg.training.beta
            * (policy_rejected_logps - reference_rejected_logps).detach()
        )

        return losses.mean(), chosen_rewards.mean(), rejected_rewards.mean()

    def get_losses(self, logits):
        # The beta is a temperature parameter for the DPO loss, typically something in the range of 0.1 to 0.5.
        # We ignore the reference model as beta -> 0. The label_smoothing parameter encodes our uncertainty about the labels and
        # calculates a conservative DPO loss.

        # Set to 0 per default, probably not too important to make it configurable (?)
        label_smoothing = 0

        losses = (
            -F.logsigmoid(self.cfg.training.beta * logits) * (1 - label_smoothing)
            - F.logsigmoid(-self.cfg.training.beta * logits) * label_smoothing
        )
        return losses


class HingeLoss(DPOLoss):
    def get_losses(self, logits):
        losses = torch.relu(1 - self.cfg.training.beta * logits)
        return losses


class IPOLoss(DPOLoss):
    def get_losses(self, logits):
        # eqn (17) of the https://arxiv.org/pdf/2310.12036.pdf
        # where beta is the real, positive KL parameter for the IPO loss,
        # denoted by tau in the paper (see also eqn (6)).
        losses = (logits - 1 / (2 * self.cfg.training.beta)) ** 2
        return losses


class Losses:
    """Losses factory."""

    _losses = {
        "DPOLoss": DPOLoss,
        "HingeLoss": HingeLoss,
        "IPOLoss": IPOLoss,
    }

    @classmethod
    def names(cls) -> KeysView:
        return cls._losses.keys()

    @classmethod
    def get(cls, name: str) -> Any:
        """Access to Losses.
        Args:
            name: losses name
        Returns:
            A class to build the Losses
        """
        return cls._losses.get(name, DPOLoss)