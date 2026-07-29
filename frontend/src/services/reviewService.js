import api from "./api";


// =====================================================
// GET PRODUCT REVIEWS
// =====================================================

export const getProductReviews = async (productId) => {

    const response = await api.get(
        `/reviews/product/${productId}`
    );

    return response.data;
};



// =====================================================
// ADD REVIEW
// =====================================================

export const addReview = async (
    productId,
    reviewData
) => {

    const response = await api.post(
        `/reviews/product/${productId}`,
        reviewData
    );

    return response.data;
};



// =====================================================
// UPDATE REVIEW
// =====================================================

export const updateReview = async (
    reviewId,
    reviewData
) => {

    const response = await api.put(
        `/reviews/${reviewId}`,
        reviewData
    );

    return response.data;
};



// =====================================================
// DELETE REVIEW
// =====================================================

export const deleteReview = async (
    reviewId
) => {

    const response = await api.delete(
        `/reviews/${reviewId}`
    );

    return response.data;
};