import argparse
import logging
import sys

from app_utils import hugging_face_utils

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="")
    parser.add_argument(
        "-e",
        "--experiment_name",
        required=True,
        help="experiment name",
        default=argparse.SUPPRESS,
    )

    parser.add_argument(
        "-d",
        "--device",
        help="'cpu' or 'cuda:0', if the GPU device id is 0",
        default="cuda:0",
    )

    parser.add_argument(
        "-a",
        "--api_key",
        required=False,
        help="Hugging Face API Key",
        default=argparse.SUPPRESS,
    )

    parser.add_argument(
        "-u",
        "--user_id",
        required=False,
        help="Hugging Face User ID",
        default=argparse.SUPPRESS,
    )

    parser.add_argument(
        "-m",
        "--model_name",
        required=True,
        help="Hugging Face Model Name",
        default=argparse.SUPPRESS,
    )

    parser_args, unknown = parser.parse_known_args(sys.argv)

    experiment_name = parser_args.experiment_name
    device = parser_args.device
    api_key = parser_args.api_key
    user_id = parser_args.user_id
    model_name = parser_args.model_name

    try:
        hugging_face_utils.publish_model_to_hugging_face(
            experiment_name=experiment_name,
            device=device,
            api_key=api_key,
            user_id=user_id,
            model_name=model_name,
        )
    except Exception:
        logging.error("Exception occurred during the run:", exc_info=True)