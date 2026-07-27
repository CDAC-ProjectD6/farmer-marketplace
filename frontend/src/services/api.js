import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Add access token to every request
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired access token
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken =
        localStorage.getItem("refreshToken");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/refresh",
          {
            refreshToken: refreshToken,
          }
        );

        const data = response.data;

        // Backend returns new access + refresh tokens
        localStorage.setItem(
          "accessToken",
          data.accessToken
        );

        localStorage.setItem(
          "refreshToken",
          data.refreshToken
        );

        // Retry original request with new token
        originalRequest.headers.Authorization =
          `Bearer ${data.accessToken}`;

        return api(originalRequest);

      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;