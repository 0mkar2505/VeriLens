const API_BASE = "http://127.0.0.1:8000";

const apiStatus = document.getElementById("apiStatus");
const modeButtons = document.querySelectorAll(".mode-button");
const imageView = document.getElementById("imageView");
const textView = document.getElementById("textView");

const imageInput = document.getElementById("imageInput");
const imageFileName = document.getElementById("imageFileName");
const imagePreview = document.getElementById("imagePreview");
const previewPanel = document.querySelector(".preview-panel");
const imageAnalyzeButton = document.getElementById("imageAnalyzeButton");
const clearImageButton = document.getElementById("clearImageButton");
const imageResult = document.getElementById("imageResult");

const textInput = document.getElementById("textInput");
const textAnalyzeButton = document.getElementById("textAnalyzeButton");
const clearTextButton = document.getElementById("clearTextButton");
const textResult = document.getElementById("textResult");

let selectedImage = null;

function setApiStatus(state, label) {
    apiStatus.className = `status-pill ${state}`;
    apiStatus.textContent = label;
}

async function checkApi() {
    try {
        const response = await fetch(`${API_BASE}/health`);
        if (!response.ok) {
            throw new Error("API unavailable");
        }
        const data = await response.json();
        setApiStatus("online", `API Online (${data.device})`);
    } catch {
        setApiStatus("offline", "API Offline");
    }
}

function switchMode(mode) {
    modeButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.mode === mode);
    });

    imageView.classList.toggle("active", mode === "image");
    textView.classList.toggle("active", mode === "text");
}

function renderMeters(probabilities) {
    return `
        <div class="meter-list">
            ${Object.entries(probabilities).map(([label, value]) => `
                <div class="meter-row">
                    <strong>${label}</strong>
                    <div class="meter-track">
                        <div class="meter-fill" style="width: ${value}%"></div>
                    </div>
                    <span>${value}%</span>
                </div>
            `).join("")}
        </div>
    `;
}

function renderResult(container, data) {
    const probabilities = data.probabilities || {
        "AI Generated": data.ai_probability,
        "Human Created": data.human_probability
    };

    container.classList.remove("hidden");
    container.innerHTML = `
        <div class="result-summary">
            <div>
                <p class="result-label">Prediction</p>
                <h3 class="prediction">${data.prediction}</h3>
            </div>
            <div class="confidence">${data.confidence || Math.max(data.ai_probability, data.human_probability)}%</div>
        </div>
        ${renderMeters(probabilities)}
        ${data.indicators ? `
            <ul class="indicator-list">
                ${data.indicators.map((indicator) => `<li>${indicator}</li>`).join("")}
            </ul>
        ` : ""}
    `;
}

function renderError(container, message) {
    container.classList.remove("hidden");
    container.innerHTML = `<div class="error-message">${message}</div>`;
}

modeButtons.forEach((button) => {
    button.addEventListener("click", () => switchMode(button.dataset.mode));
});

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    selectedImage = file || null;
    imageAnalyzeButton.disabled = !selectedImage;
    imageResult.classList.add("hidden");

    if (!selectedImage) {
        imageFileName.textContent = "PNG, JPG, or JPEG";
        imagePreview.removeAttribute("src");
        previewPanel.classList.remove("has-image");
        return;
    }

    imageFileName.textContent = selectedImage.name;
    imagePreview.src = URL.createObjectURL(selectedImage);
    previewPanel.classList.add("has-image");
});

imageAnalyzeButton.addEventListener("click", async () => {
    if (!selectedImage) {
        return;
    }

    imageAnalyzeButton.disabled = true;
    imageAnalyzeButton.textContent = "Analyzing";

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
        const response = await fetch(`${API_BASE}/image/predict`, {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || "Image analysis failed.");
        }

        renderResult(imageResult, data);
    } catch (error) {
        renderError(imageResult, error.message);
    } finally {
        imageAnalyzeButton.disabled = false;
        imageAnalyzeButton.textContent = "Analyze Image";
    }
});

clearImageButton.addEventListener("click", () => {
    imageInput.value = "";
    selectedImage = null;
    imageFileName.textContent = "PNG, JPG, or JPEG";
    imagePreview.removeAttribute("src");
    previewPanel.classList.remove("has-image");
    imageAnalyzeButton.disabled = true;
    imageResult.classList.add("hidden");
});

textAnalyzeButton.addEventListener("click", async () => {
    const text = textInput.value.trim();

    if (!text) {
        renderError(textResult, "Paste text before running verification.");
        return;
    }

    textAnalyzeButton.disabled = true;
    textAnalyzeButton.textContent = "Analyzing";

    try {
        const response = await fetch(`${API_BASE}/text/predict`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || "Text analysis failed.");
        }

        renderResult(textResult, data);
    } catch (error) {
        renderError(textResult, error.message);
    } finally {
        textAnalyzeButton.disabled = false;
        textAnalyzeButton.textContent = "Analyze Text";
    }
});

clearTextButton.addEventListener("click", () => {
    textInput.value = "";
    textResult.classList.add("hidden");
});

checkApi();
