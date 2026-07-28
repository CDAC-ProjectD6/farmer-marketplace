import api from "./api";


// =====================================================
// GET USER WISHLIST
// =====================================================

export const getWishlist = async () => {

    const email = localStorage.getItem("email");

    const response = await api.get(
        `/wishlist?email=${email}`
    );

    return response.data;
};


// =====================================================
// ADD PRODUCT TO WISHLIST
// =====================================================

export const addToWishlist = async (productId) => {

    const email = localStorage.getItem("email");

    const response = await api.post(
        `/wishlist/${productId}?email=${email}`
    );

    return response.data;
};


// =====================================================
// REMOVE PRODUCT FROM WISHLIST
// =====================================================

export const removeFromWishlist = async (productId) => {

    const email = localStorage.getItem("email");

    const response = await api.delete(
        `/wishlist/${productId}?email=${email}`
    );

    return response.data;
};