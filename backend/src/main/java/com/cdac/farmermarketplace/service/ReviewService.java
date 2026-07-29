package com.cdac.farmermarketplace.service;


import java.util.List;

import com.cdac.farmermarketplace.dto.request.ReviewRequest;
import com.cdac.farmermarketplace.dto.response.ReviewResponse;



public interface ReviewService {


    // Add review for product
    ReviewResponse addReview(
            Long productId,
            ReviewRequest request,
            Long userId
    );



    // Get all reviews of product
    List<ReviewResponse> getProductReviews(
            Long productId
    );



    // Delete own review
    void deleteReview(
            Long reviewId,
            Long userId
    );



    // Update own review
    ReviewResponse updateReview(
            Long reviewId,
            ReviewRequest request,
            Long userId
    );
    
    Double getAverageRating(Long productId);


    Long getReviewCount(Long productId);


}