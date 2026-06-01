import apiClient from "./apiClient.js";

export async function fetchHistory() {
  const response = await apiClient.get("/history");
  return response.data;
}

export async function deleteHistoryItem(analysisId) {
  const response = await apiClient.delete(`/history/${analysisId}`);
  return response.data;
}
