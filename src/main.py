import pandas as pd
from pathlib import Path
from fastapi import Query
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from prediction import predict_yield
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
title="CropYield AI",
description="An API for predicting crop yields in India using machine learning.",
version="1.0.0"
)

# Locate the project root
PROJECT_ROOT = Path(__file__).resolve().parent.parent

# Path to the processed dataset
DATA_PATH = PROJECT_ROOT / "data" / "processed" / "india_crop_yield_annual.csv"

# Load historical crop-yield records
def load_historical_data():
    """Load historical crop-yield records from the processed CSV."""

    if not DATA_PATH.exists():
        raise FileNotFoundError(
            f"Historical dataset not found: {DATA_PATH}"
        )

    df = pd.read_csv(DATA_PATH)

    required_columns = {"Item", "Year", "hg_ha_yield"}

    if not required_columns.issubset(df.columns):
        raise ValueError("The historical dataset has an invalid structure.")

    return df

#for connectoing the frontend with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

#backend endpoints for the frontend to access the data and make predictions
class PredictionRequest(BaseModel):
    crop: str = Field(..., description="Supported crop name")
    year: int = Field(..., ge=1990, description="Prediction year")

@app.get("/")
def home():
        return {
        "message": "Welcome to CropYield AI API",
        "status": "running"
        }
# Endpoint to retrieve supported crops
@app.get("/crops")
def get_supported_crops():
        from prediction import SUPPORTED_CROPS
        return {"supported_crops": SUPPORTED_CROPS}

# Endpoint for predicting crop yield
@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        result = predict_yield(request.crop, request.year)
        return result
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))
    except FileNotFoundError as error:
        raise HTTPException(status_code=500, detail=str(error))
#for getting the historical yield values for a selected crop
@app.get("/history")
def get_historical_yield(crop: str):
    """Return historical yield values for a selected crop."""

    try:
        df = load_historical_data()

        crop_data = df[df["Item"] == crop].copy()

        if crop_data.empty:
            raise HTTPException(
                status_code=404,
                detail=f"No historical data found for crop: {crop}"
            )

        crop_data = crop_data.sort_values("Year")

        records = crop_data[["Year", "hg_ha_yield"]].to_dict(
            orient="records"
        )

        return {
            "crop": crop,
            "unit": "hg/ha",
            "records": records
        }

    except HTTPException:
        raise

    except FileNotFoundError as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

    except ValueError as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )