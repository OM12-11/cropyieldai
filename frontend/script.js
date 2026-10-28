const API_BASE_URL = "http://127.0.0.1:8000";

const form = document.getElementById("prediction-form");
const cropInput = document.getElementById("crop");
const yearInput = document.getElementById("year");

const predictButton = document.getElementById("predict-button");
const buttonText = document.getElementById("button-text");

const resultBox = document.getElementById("result");
const resultCrop = document.getElementById("result-crop");
const resultValue = document.getElementById("result-value");
const resultUnit = document.getElementById("result-unit");

const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async function (event) {
event.preventDefault();

resultBox.classList.add("hidden");
errorMessage.classList.add("hidden");

const crop = cropInput.value;
const year = Number(yearInput.value);

if (!crop || !Number.isInteger(year) || year < 1990) {
    showError("Please select a crop and enter a valid year.");
    return;
}

predictButton.disabled = true;
buttonText.textContent = "Generating prediction...";

try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            crop: crop,
            year: year
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            typeof data.detail === "string"
                ? data.detail
                : "The prediction request failed."
        );
    }

    resultCrop.textContent = `${data.crop} · ${data.year}`;
    resultValue.textContent =
        Number(data.predicted_yield_hg_ha).toLocaleString(
            "en-IN",
            { maximumFractionDigits: 2 }
        );

    resultUnit.textContent = `Yield unit: ${data.unit}`;

    resultBox.classList.remove("hidden");

} catch (error) {
    if (error instanceof TypeError) {
        showError(
            "Could not connect to the API. Check that the FastAPI " +
            "server is running at http://127.0.0.1:8000."
        );
    } else {
        showError(error.message || "An unexpected error occurred.");
    }
} finally {
    predictButton.disabled = false;
    buttonText.textContent = "Predict crop yield";
}


});

function showError(message) {
errorMessage.textContent = message;
errorMessage.classList.remove("hidden");
}

const historyCropInput = document.getElementById("crop");
const historyCanvas = document.getElementById("history-chart");
const historyLoading = document.getElementById("history-loading");
const historyError = document.getElementById("history-error");

let historyChart = null;
let historyRequestId = 0;

// Load historical data for the selected crop.
async function loadHistoricalData() {
    const crop = historyCropInput.value;
    const requestId = ++historyRequestId;

    historyError.classList.add("hidden");
    historyLoading.classList.add("hidden");

    if (!crop) {
        if (historyChart) {
            historyChart.destroy();
            historyChart = null;
        }
        return;
    }

    historyLoading.textContent = "Loading historical data...";
    historyLoading.classList.remove("hidden");

    try {
        const response = await fetch(
            `${API_BASE_URL}/history?crop=${encodeURIComponent(crop)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                typeof data.detail === "string"
                    ? data.detail
                    : "Could not load historical data."
            );
        }

        // Ignore outdated responses if the selected crop changes.
        if (requestId !== historyRequestId) {
            return;
        }

        if (!Array.isArray(data.records) || data.records.length === 0) {
            throw new Error("No historical records are available.");
        }

        renderHistoricalChart(data);

    } catch (error) {
        if (requestId !== historyRequestId) {
            return;
        }

        if (historyChart) {
            historyChart.destroy();
            historyChart = null;
        }

        historyError.textContent =
            error instanceof TypeError
                ? "Could not connect to the API. Check that FastAPI is running."
                : error.message;

        historyError.classList.remove("hidden");

    } finally {
        if (requestId === historyRequestId) {
            historyLoading.classList.add("hidden");
        }
    }
}


// Create or update the historical yield line chart.
function renderHistoricalChart(data) {
    const years = data.records.map(record => Number(record.Year));
    const yields = data.records.map(record => Number(record.hg_ha_yield));

    if (
        years.some(year => !Number.isFinite(year)) ||
        yields.some(value => !Number.isFinite(value))
    ) {
        throw new Error("The historical dataset contains invalid values.");
    }

    if (historyChart) {
        historyChart.destroy();
    }

    historyChart = new Chart(historyCanvas, {
        type: "line",

        data: {
            labels: years,
            datasets: [{
                label: `${data.crop} yield`,
                data: yields,
                borderColor: "#247447",
                backgroundColor: "rgba(36, 116, 71, 0.12)",
                borderWidth: 2.5,
                pointRadius: 3,
                pointHoverRadius: 6,
                tension: 0.2,
                fill: true
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                intersect: false,
                mode: "index"
            },

            plugins: {
                legend: {
                    display: true,
                    position: "top"
                },

                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return (
                                "Yield: " +
                                Number(context.parsed.y).toLocaleString("en-IN") +
                                " hg/ha"
                            );
                        }
                    }
                }
            },

            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Year"
                    }
                },

                y: {
                    beginAtZero: false,

                    title: {
                        display: true,
                        text: "Yield (hg/ha)"
                    },

                    ticks: {
                        callback: function(value) {
                            return Number(value).toLocaleString("en-IN");
                        }
                    }
                }
            }
        }
    });
}


// Refresh the chart when the selected crop changes.
historyCropInput.addEventListener("change", loadHistoricalData);


// Load the chart once if a crop is already selected.
if (historyCropInput.value) {
    loadHistoricalData();
}