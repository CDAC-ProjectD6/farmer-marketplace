import api from "./api";

const wishlistService = {
  getWishlist: async () => {
    const email = localStorage.getItem("email");

    const response = await api.get("/wishlist", {
      params: { email },
    });

    return response.data;
  },

  addToWishlist: async (productId) => {
    const email = localStorage.getItem("email");

    const response = await api.post(
      `/wishlist/${productId}`,
      null,
      {
        params: { email },
      }
    );

    return response.data;
  },

  removeFromWishlist: async (productId) => {
    const email = localStorage.getItem("email");

    const response = await api.delete(
      `/wishlist/${productId}`,
      {
        params: { email },
      }
    );

    return response.data;
  },
};

export default wishlistService;