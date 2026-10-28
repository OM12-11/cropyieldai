# CropYield AI — India Crop Yield Prediction

CropYield AI is a machine-learning web application that estimates crop yields in India using historical agricultural data. It combines crop-specific regression models with a FastAPI backend and a web-based frontend to make yield estimates accessible through a simple interface.

> **Project status:** Working prototype. Predictions for future years are extrapolations of historical trends and should not be treated as guaranteed agricultural forecasts.

## Features

* Predict estimated yields for six supported crops.
* Use crop-specific machine-learning models.
* Access predictions through a FastAPI REST API.
* View historical crop-yield trends through the web interface.
* Inspect API endpoints using the automatically generated Swagger documentation.
* Explore data processing and model experiments in Jupyter notebooks.

## Supported Crops

* Potatoes
* Rice, paddy
* Sorghum
* Soybeans
* Sweet potatoes
* Wheat

## Technology Stack

| Component            | Technology            |
| -------------------- | --------------------- |
| Programming language | Python                |
| Data processing      | Pandas, NumPy         |
| Machine learning     | Scikit-learn          |
| Model persistence    | Joblib                |
| Backend API          | FastAPI               |
| API server           | Uvicorn               |
| Frontend             | HTML, CSS, JavaScript |
| Data exploration     | Jupyter Notebook      |

## Project Structure

```text
cropai/
├── data/
│   ├── raw/
│   └── processed/
├── models/
│   ├── model_metadata.json
│   └── crop-specific model files
├── notebooks/
│   ├── implementation.ipynb
│   └── processdata.ipynb
├── src/
│   ├── __init__.py
│   ├── main.py
│   ├── prediction.py
│   └── test_prediction.py
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── requirements.txt
└── README.md
```

## Dataset

The project uses a processed India crop-yield dataset derived from historical agricultural records.

The processed dataset contains 138 observations and seven columns:

* `Area`
* `Item`
* `Year`
* `hg_ha_yield`
* `average_rain_fall_mm_per_year`
* `pesticides_tonnes`
* `avg_temp`

The processed dataset covers 1990–2013, with 2003 missing for all six crops. Each crop has 23 annual observations.

The prediction target is `hg_ha_yield`, measured in hectograms per hectare (hg/ha).

## Machine-Learning Approach

The project experiments with multiple regression approaches, including:

1. Shared Linear Regression.
2. Crop-Specific Linear Regression using Year.
3. Crop-Specific Linear Regression using Year and Temperature.
4. Crop-Specific Random Forest.
5. Crop-Specific Polynomial Regression.

A crop-specific mean baseline and rolling-origin validation are also used during evaluation.

The deployed models use crop-specific Linear Regression with Year as the input feature. Each supported crop has a separately saved model.

### Model Limitations

The current deployed models learn historical relationships between year and yield. They do not directly account for future rainfall, temperature, pesticide use, soil quality, irrigation, pests, or changes in agricultural practices.

The processed rainfall feature is constant across the observations, so it cannot provide useful variation for learning rainfall effects in this dataset.

The models have been evaluated using historical chronological validation, but their predictions for years beyond the available dataset are extrapolations. Their accuracy on genuinely future observations has not yet been established.

## Installation

### Prerequisites

* Python installed on your computer.
* Git, if you want to clone the repository.
* A terminal such as PowerShell or the VS Code terminal.

### 1. Clone the repository

Replace the placeholder with your actual GitHub repository URL after publishing the project.

```bash
git clone https://github.com/OM12-11/cropai.git
cd cropai
```

Alternatively, download the repository as a ZIP file and extract it.

### 2. Create a virtual environment

```bash
python -m venv .venv
```

Activate it on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```bash
python -m pip install -r requirements.txt
```

## Run the Application

Open two terminals from the project root.

### Terminal 1: Start the FastAPI backend

```powershell
cd src
python -m uvicorn main:app --reload
```

The API will be available at:

`http://127.0.0.1:8000`

Interactive API documentation:

`http://127.0.0.1:8000/docs`

### Terminal 2: Start the frontend

From the project root:

```powershell
python -m http.server 5500 --bind 127.0.0.1 --directory frontend
```

Open the frontend in your browser:

`http://127.0.0.1:5500/`

Keep both terminals running while using the application.

## API Endpoints

| Method | Endpoint              | Purpose                             |
| ------ | --------------------- | ----------------------------------- |
| GET    | `/`                   | Check API status                    |
| GET    | `/crops`              | Retrieve supported crops            |
| POST   | `/predict`            | Generate a crop-yield estimate      |
| GET    | `/history?crop=Wheat` | Retrieve historical data for a crop |

### Example Prediction Request

```http
POST /predict
Content-Type: application/json
```

```json
{
  "crop": "Wheat",
  "year": 2025
}
```

The exact response structure is defined by the FastAPI implementation. Use the interactive API documentation at `/docs` to inspect the available request and response schemas.

## Model Evaluation

The project compares regression models using:

* Mean Absolute Error (MAE)
* Root Mean Squared Error (RMSE)
* Coefficient of Determination (R²)
* Relative error
* Rolling-origin chronological validation

The experimental results favored crop-specific linear models over the shared model in the reported aggregate comparison. Adding temperature produced only a small aggregate improvement and did not consistently improve performance across chronological validation folds.

These results should be interpreted in the context of the dataset's limited size and historical evaluation periods.

## Future Improvements

* Investigate year-by-year prediction errors, especially for potatoes and soybeans.
* Evaluate all models against a matched baseline using identical chronological splits.
* Obtain reliable, varying weather and agricultural predictors.
* Validate predictions against newly observed yields when future data become available.
* Improve uncertainty reporting for future-year estimates.
* Add automated tests and continuous integration.
* Deploy the application to a suitable hosting platform.
