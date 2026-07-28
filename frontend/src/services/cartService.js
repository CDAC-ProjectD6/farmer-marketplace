import api from "./api";

const cartService = {

  // Get Logged-in User Cart
  getCart: async () => {
    const response = await api.get("/cart");
    return response.data;
  },

  // Add Product To Cart
  addToCart: async (productId, quantity) => {
    const response = await api.post("/cart/add", {
      productId,
      quantity,
    });

    return response.data;
  },

  // Update Quantity
  updateCart: async (cartItemId, quantity) => {
    const response = await api.put("/cart/update", {
      cartItemId,
      quantity,
    });

    return response.data;
  },

  // Remove Item
  removeCartItem: async (cartItemId) => {
    const response = await api.delete(`/cart/item/${cartItemId}`);
    return response.data;
  },

  // Clear Cart
  clearCart: async () => {
    const response = await api.delete("/cart/clear");
    return response.data;
  },
};

export default cartService;