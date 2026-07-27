import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// Register
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login
export const loginUser = async (loginData) => {
  const response = await axios.post(`${API_URL}/login`, loginData);
  return response.data;
};

// Refresh access token
export const refreshToken = async (refreshTokenValue) => {
  const response = await axios.post(`${API_URL}/refresh`, {
    refreshToken: refreshTokenValue,
  });

  return response.data;
};


export const forgotPassword = async (email) => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/forgot-password",
    { email }
  );

  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/verify-otp",
    {
      email,
      otp,
    }
  );

  return response.data;
};

export const resetPassword = async (email, otp, newPassword) => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/reset-password",
    {
      email,
      otp,
      newPassword,
    }
  );

  return response.data;
};