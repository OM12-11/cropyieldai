# CropYield AI — Project Roadmap & Progress Tracker

**Research Paper:** *Incorporating Meteorological Data and Pesticide Information to Forecast Crop Yields Using Machine Learning* — Hoque et al., IEEE Access, 2024.

**Project Goal:** Reproduce the research paper's machine-learning experiments as faithfully as possible, evaluate the results, and develop a crop-yield prediction application.

> **Important:** We must verify the dataset, preprocessing, algorithms, experimental setup, and evaluation metrics before claiming that we have reproduced the paper exactly.

## Progress Summary

* [ ] Phase 0 — Environment Setup
* [ ] Phase 1 — Research Paper Analysis
* [ ] Phase 2 — Dataset Acquisition
* [ ] Phase 3 — Dataset Verification
* [ ] Phase 4 — Data Ingestion
* [ ] Phase 5 — Data Cleaning and Preprocessing
* [ ] Phase 6 — Exploratory Data Analysis
* [ ] Phase 7 — Feature Engineering
* [ ] Phase 8 — Experimental Design
* [ ] Phase 9 — Baseline Model
* [ ] Phase 10 — KNN Model
* [ ] Phase 11 — Gradient Boosting Model
* [ ] Phase 12 — Third Model
* [ ] Phase 13 — Model Evaluation
* [ ] Phase 14 — Research Result Comparison
* [ ] Phase 15 — Model Saving and Prediction Pipeline
* [ ] Phase 16 — Backend API
* [ ] Phase 17 — Frontend Dashboard
* [ ] Phase 18 — Integration and Testing
* [ ] Phase 19 — Documentation
* [ ] Phase 20 — Deployment

---

## Phase 0 — Environment Setup

**Goal:** Prepare the Python environment and organize the project.

**Tasks**

* [ ] Create the project folder and virtual environment.
* [ ] Install required Python libraries.
* [ ] Create `requirements.txt`.
* [ ] Organize the project folders.

**Deliverables:** Working Python environment and project structure.

**Completion Criteria:** Required libraries import successfully.

## Phase 1 — Research Paper Analysis

**Goal:** Understand the research methodology before implementing models.

**Tasks**

* [ ] Identify the research problem and objectives.
* [ ] Record the study region, years, and six crop categories.
* [ ] Identify the prediction target and input variables.
* [ ] Extract dataset sources and variable units.
* [ ] Record preprocessing and evaluation methods.
* [ ] Identify the models and their configurations.
* [ ] Investigate any ambiguous methodological details.

**Deliverable:** `reports/research_specification.md`

**Completion Criteria:** The paper's methodology is documented, including unresolved details.

## Phase 2 — Dataset Acquisition

**Goal:** Obtain and preserve the source datasets.

**Tasks**

* [ ] Store `yield_df.csv` in `data/raw/`.
* [ ] Record the dataset source and download date.
* [ ] Inspect the columns, years, and crop categories.
* [ ] Verify whether the downloaded CSV is the exact dataset used by the authors.
* [ ] Obtain additional source data if required.

**Deliverable:** Raw datasets and source documentation.

**Completion Criteria:** Dataset provenance and suitability are documented.

## Phase 3 — Dataset Verification

**Goal:** Prepare and verify the India-only dataset for the six target crops during 1990–2013.

**Tasks**

* [ ] Filter the dataset to India.
* [ ] Select the six target crops using the actual CSV labels.
* [ ] Filter the years to 1990–2013.
* [ ] Check the number of rows and observations per crop.
* [ ] Check missing values and duplicate observations.
* [ ] Verify the year range and yield units.
* [ ] Compare the results with the paper's reported dataset size.
* [ ] Investigate any differences.
* [ ] Save the filtered dataset.

**Deliverables:**

* `data/processed/india_crop_yield_1990_2013.csv`
* `reports/dataset_verification.md`

**Completion Criteria:** The dataset is saved and discrepancies with the paper are explained or documented.

## Phase 4 — Data Ingestion

**Goal:** Build reusable code to load the dataset.

**Tasks**

* [ ] Create `src/ingestion/csv_loader.py`.
* [ ] Implement a CSV-loading function.
* [ ] Validate the file path and required columns.
* [ ] Handle invalid or missing files.
* [ ] Test the loader from a notebook.

**Deliverable:** Reusable and tested CSV loader.

**Completion Criteria:** Valid datasets load correctly, and common errors are handled clearly.

## Phase 5 — Data Cleaning and Preprocessing

**Goal:** Prepare reliable data using the research paper's documented procedure.

**Tasks**

* [ ] Check data types and missing values.
* [ ] Identify duplicate and invalid observations.
* [ ] Investigate outliers.
* [ ] Verify variable units.
* [ ] Apply justified transformations.
* [ ] Document each preprocessing step.

**Deliverable:** Cleaned dataset and reproducible preprocessing code.

**Completion Criteria:** The processed dataset can be regenerated from the raw data.

## Phase 6 — Exploratory Data Analysis (EDA)

**Goal:** Understand the distributions and relationships among the variables.

**Tasks**

* [ ] Calculate descriptive statistics.
* [ ] Analyze yield by crop.
* [ ] Examine yield trends over time.
* [ ] Analyze rainfall, temperature, and pesticide usage.
* [ ] Create distribution plots and relationship charts.
* [ ] Investigate correlations and potential data-quality issues.

**Deliverable:** `notebooks/3_data_exploration.ipynb` and visualization files.

**Completion Criteria:** Important patterns and limitations are documented.

## Phase 7 — Feature Engineering

**Goal:** Prepare model inputs and the prediction target.

**Tasks**

* [ ] Define the input features `X`.
* [ ] Define crop yield as the target `y`.
* [ ] Encode categorical features if required.
* [ ] Apply appropriate transformations and scaling.
* [ ] Prevent target leakage.
* [ ] Document the final feature schema.

**Deliverable:** Reproducible feature-preparation pipeline.

**Completion Criteria:** The model-ready features match the documented experiment.

## Phase 8 — Experimental Design

**Goal:** Establish a consistent training and testing procedure.

**Tasks**

* [ ] Identify the paper's train/test split.
* [ ] Record random seeds if specified.
* [ ] Record model hyperparameters.
* [ ] Identify evaluation metrics.
* [ ] Document any experimental details that are unavailable.

**Deliverable:** `reports/experiment_configuration.md`

**Completion Criteria:** The experimental procedure is documented and repeatable.

## Phase 9 — Baseline Model

**Goal:** Establish a reference score for model comparison.

**Tasks**

* [ ] Implement a simple baseline model.
* [ ] Train it on the training data.
* [ ] Evaluate it on the test data.
* [ ] Record the metrics.

**Deliverable:** Baseline results.

**Completion Criteria:** A repeatable reference score is available.

*Note: This is an additional experiment if the original paper did not use a baseline model.*

## Phase 10 — KNN Model

**Goal:** Reproduce the paper's K-nearest-neighbors experiment.

**Tasks**

* [ ] Confirm the algorithm's settings.
* [ ] Apply the required preprocessing.
* [ ] Train the KNN model.
* [ ] Generate predictions.
* [ ] Calculate the evaluation metrics.
* [ ] Record the configuration and results.

**Deliverable:** KNN model and evaluation results.

**Completion Criteria:** The experiment is repeatable and follows the documented methodology.

## Phase 11 — Gradient Boosting Model

**Goal:** Reproduce the paper's Gradient Boosting experiment.

**Tasks**

* [ ] Identify the implementation and hyperparameters used in the paper.
* [ ] Train the model.
* [ ] Generate predictions.
* [ ] Calculate evaluation metrics.
* [ ] Record results and deviations from the paper.

**Deliverable:** Gradient Boosting model and evaluation results.

**Completion Criteria:** The model is evaluated using the same experimental procedure as the other models.

## Phase 12 — Third Model

**Goal:** Identify and reproduce the paper's third model.

**Tasks**

* [ ] Inspect the paper's description of multivariate logistic regression.
* [ ] Determine the actual algorithm used by the authors.
* [ ] Verify how it handles the continuous crop-yield target.
* [ ] Implement the method if sufficient details are available.
* [ ] Document any limitations if exact reproduction is not possible.

**Deliverable:** Third-model implementation or a documented reproducibility limitation.

**Completion Criteria:** The algorithm is correctly identified rather than silently replaced with another method.

## Phase 13 — Model Evaluation

**Goal:** Compare model performance using consistent data and metrics.

**Tasks**

* [ ] Calculate the metrics reported in the paper.
* [ ] Verify that all models use the same test set.
* [ ] Check consistency of yield units.
* [ ] Create a model-comparison table.
* [ ] Visualize the results if useful.

**Deliverable:** `reports/model_comparison.csv` and an evaluation report.

**Completion Criteria:** Model results are comparable and reproducible.

## Phase 14 — Research Result Comparison

**Goal:** Compare our experimental findings with the published paper.

**Tasks**

* [ ] Compare dataset size and crop categories.
* [ ] Compare preprocessing and experimental settings.
* [ ] Compare evaluation metrics.
* [ ] Investigate differences in results.
* [ ] Document reproducibility limitations.

**Deliverable:** `reports/reproduction_analysis.md`

**Completion Criteria:** The report clearly states what was reproduced and what differed.

## Phase 15 — Model Saving and Prediction Pipeline

**Goal:** Package the evaluated model for reuse.

**Tasks**

* [ ] Save the trained model.
* [ ] Save fitted preprocessing components.
* [ ] Create a reusable prediction function.
* [ ] Validate input features and units.
* [ ] Test the saved pipeline in a fresh Python session.

**Deliverable:** Saved model artifacts and prediction code.

**Completion Criteria:** The saved model produces predictions using the correct preprocessing pipeline.

## Phase 16 — Backend API

**Goal:** Make the prediction model accessible through an API.

**Tasks**

* [ ] Create a FastAPI application.
* [ ] Define and validate the request schema.
* [ ] Load the saved model.
* [ ] Implement the prediction endpoint.
* [ ] Handle invalid requests.
* [ ] Test the API.

**Deliverable:** Working prediction API.

**Completion Criteria:** Valid requests return predictions in the correct units.

## Phase 17 — Frontend Dashboard

**Goal:** Create a user-friendly interface for crop-yield predictions.

**Tasks**

* [ ] Add crop and feature input controls.
* [ ] Display predicted yield and its unit.
* [ ] Show relevant historical insights.
* [ ] Display model-performance information.
* [ ] Explain the dataset's limitations.
* [ ] Connect the interface to the backend.

**Deliverable:** Crop-yield prediction dashboard.

**Completion Criteria:** Users can submit inputs and view predictions clearly.

## Phase 18 — Integration and Testing

**Goal:** Verify the complete application.

**Tasks**

* [ ] Test data loading and preprocessing.
* [ ] Test model loading and prediction.
* [ ] Test API endpoints.
* [ ] Test frontend/backend communication.
* [ ] Check invalid inputs and unit consistency.
* [ ] Document and fix issues.

**Deliverable:** Test suite and test report.

**Completion Criteria:** The main workflow works from user input to prediction output.

## Phase 19 — Documentation

**Goal:** Document the research and application so another person can understand and reproduce the work.

**Tasks**

* [ ] Write the project README.
* [ ] Document dataset sources and limitations.
* [ ] Explain preprocessing and model implementation.
* [ ] Record experimental results.
* [ ] Document API usage and setup instructions.
* [x] Prepare the final research and project report.

**Deliverable:** Complete project documentation.

**Completion Criteria:** Another person can set up the project and reproduce the documented workflow.

## Phase 20 — Deployment

**Goal:** Make the completed application accessible.

**Tasks**

* [x] Prepare production dependencies.
* [ ] Deploy the backend.
* [ ] Deploy the frontend.
* [ ] Configure service communication.
* [ ] Test the deployed application.
* [ ] Document deployment and model limitations.

**Deliverable:** Deployed application and deployment instructions.

**Completion Criteria:** The application works in its intended environment.

---
