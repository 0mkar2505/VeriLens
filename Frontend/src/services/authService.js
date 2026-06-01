import apiClient from "./apiClient.js";

export async function loginUser({ email, password }) {
  const body = new URLSearchParams();
  body.append("username", email);
  body.append("password", password);

  const response = await apiClient.post("/auth/login", body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  return response.data;
}

export async function registerUser(payload) {
  const response = await apiClient.post("/auth/register", payload);
  return response.data;
}

export async function fetchCurrentUser() {
  const response = await apiClient.get("/auth/me");
  return response.data;
}
