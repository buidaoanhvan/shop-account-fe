import { useAuthStore } from "../lib/store/auth-store";

export const fetcher = async (url: string, method = "GET", data?: any) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
    ...(data && { body: JSON.stringify(data) }),
  };

  const response = await fetch(url, options);
  const result = await response.json();

  if (response.status === 401) {
    useAuthStore.getState().clearAuth();
    useAuthStore.getState().setRequireLogin(true);
    return;
  }

  if (response.status === 403) {
    window.location.href = "/";
    return;
  }

  return result;
};
