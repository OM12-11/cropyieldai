
import json
import joblib
import pandas as pd
from pathlib import Path


# Locate the project root and models directory
PROJECT_ROOT = Path(__file__).resolve().parent.parent
MODEL_DIR = PROJECT_ROOT / "models"


# Load model metadata
metadata_path = MODEL_DIR / "model_metadata.json"

with open(metadata_path, "r", encoding="utf-8") as file:
    metadata = json.load(file)


# Supported crops from the trained models
SUPPORTED_CROPS = metadata["crops"]


def predict_yield(crop: str, year: int) -> dict:
    """
    Predict crop yield using the saved crop-specific model.

    Parameters
    ----------
    crop : str
        Crop name, such as 'Wheat' or 'Rice, paddy'.

    year : int
        Year for which yield is to be predicted.

    Returns
    -------
    dict
        Crop name, forecast year, predicted yield, and unit.
    """

    # Validate crop name
    if crop not in SUPPORTED_CROPS:
        raise ValueError(
            f"Unsupported crop: {crop}. "
            f"Choose from: {SUPPORTED_CROPS}"
        )

    # Validate year input
    if isinstance(year, bool) or not isinstance(year, int):
        raise TypeError("Year must be an integer.")

    if year < 1990:
        raise ValueError("Year must be 1990 or later.")

    # Generate the model filename
    filename = (
        crop.lower()
        .replace(",", "")
        .replace(" ", "_")
        + "_model.joblib"
    )

    model_path = MODEL_DIR / filename

    if not model_path.exists():
        raise FileNotFoundError(
            f"Trained model not found: {model_path}"
        )

    # Load the appropriate crop model
    model = joblib.load(model_path)

    # Generate the prediction
    input_data = pd.DataFrame({
        "Year": [year]
    })

    predicted_yield = float(
        model.predict(input_data)[0]
    )
    yield_hg_ha = round(predicted_yield, 2)
    yield_tonnes_ha = round(predicted_yield / 10000, 3)

    return {
        "crop": crop,
        "year": year,
        "predicted_yield_hg_ha": yield_hg_ha,
        "predicted_yield_tonnes_ha": yield_tonnes_ha,
        "unit": "tonnes/ha"
}
