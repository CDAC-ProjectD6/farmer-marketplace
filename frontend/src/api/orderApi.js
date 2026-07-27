import api from "./axios";

const ORDER_BASE_URL = "/orders";

/**
 * Place Order
 */
export const placeOrder = async (orderData) => {
  const response = await api.post(`${ORDER_BASE_URL}/place`, orderData);
  return response.data;
};

/**
 * Get Order By Id
 */
export const getOrderById = async (orderId) => {
  const response = await api.get(`${ORDER_BASE_URL}/${orderId}`);
  return response.data;
};

/**
 * Get All Orders of a User
 */
export const getOrdersByUserId = async (userId) => {
  const response = await api.get(`${ORDER_BASE_URL}/user/${userId}`);
  return response.data;
};

/**
 * Cancel Order
 */
export const cancelOrder = async (orderId) => {
  const response = await api.put(`${ORDER_BASE_URL}/cancel/${orderId}`);
  return response.data;
};