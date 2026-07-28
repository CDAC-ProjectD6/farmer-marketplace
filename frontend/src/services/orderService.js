import api from "./api";

const orderService = {

  // Place Order
  placeOrder: async (orderData) => {
    const response = await api.post("/orders/place", orderData);
    return response.data;
  },

  // Get Single Order
  getOrder: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Get Logged-in User Orders
  getMyOrders: async () => {
    const response = await api.get("/orders/my-orders");
    return response.data;
  },

  // Cancel Order
  cancelOrder: async (orderId) => {
    const response = await api.put(`/orders/cancel/${orderId}`);
    return response.data;
  }

};

export default orderService;