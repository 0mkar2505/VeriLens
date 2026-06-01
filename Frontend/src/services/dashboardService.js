import apiClient from "./apiClient.js";

export async function fetchDashboardStats() {
  const response = await apiClient.get("/dashboard/stats");
  return response.data;
}

export async function fetchDashboardRecent() {
  const response = await apiClient.get("/dashboard/recent");
  return response.data;
}
