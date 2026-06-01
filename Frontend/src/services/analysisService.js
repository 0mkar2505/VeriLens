import apiClient from "./apiClient.js";

export async function analyzeImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/image/predict", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
}

export async function analyzeText(text) {
  const response = await apiClient.post("/text/predict", { text });
  return response.data;
}
