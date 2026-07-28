import api from "./api";

export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Products that are active and available for purchase
export const getAvailableProducts = async () => {
  const response = await api.get("/products/available");
  return response.data;
};