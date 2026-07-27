import api from "./axios";

const CART_BASE_URL = "/cart";

export const addToCart = async (cartData) => {
  const response = await api.post(`${CART_BASE_URL}/add`, cartData);
  return response.data;
};

export const getCartByUserId = async (userId) => {
  const response = await api.get(`${CART_BASE_URL}/${userId}`);
  return response.data;
};

export const updateCart = async (cartData) => {
  const response = await api.put(`${CART_BASE_URL}/update`, cartData);
  return response.data;
};

export const removeCartItem = async (cartItemId) => {
  const response = await api.delete(`${CART_BASE_URL}/item/${cartItemId}`);
  return response.data;
};

export const clearCart = async (userId) => {
  const response = await api.delete(`${CART_BASE_URL}/clear/${userId}`);
  return response.data;
};