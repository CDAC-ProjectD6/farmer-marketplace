package com.cdac.farmermarketplace.service.impl;


import java.util.ArrayList;
import java.util.List;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.cdac.farmermarketplace.dto.request.ReviewRequest;
import com.cdac.farmermarketplace.dto.response.ReviewResponse;

import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.entity.Review;
import com.cdac.farmermarketplace.entity.User;

import com.cdac.farmermarketplace.exception.BadRequestException;
import com.cdac.farmermarketplace.exception.ResourceNotFoundException;

import com.cdac.farmermarketplace.repository.ProductRepository;
import com.cdac.farmermarketplace.repository.ReviewRepository;
import com.cdac.farmermarketplace.repository.UserRepository;

import com.cdac.farmermarketplace.service.ReviewService;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {



    private final ReviewRepository reviewRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;



    // ================= ADD REVIEW =================

    @Override
    public ReviewResponse addReview(
            Long productId,
            ReviewRequest request,
            Long userId
    ) {


        User user =
                userRepository.findById(userId)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "User not found"
                        )
                );



        Product product =
                productRepository.findById(productId)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Product not found"
                        )
                );



        if(reviewRepository.existsByUserAndProduct(
                user,
                product
        )) {

            throw new BadRequestException(
                    "You already reviewed this product"
            );

        }



        Review review = new Review();


        review.setUser(user);

        review.setProduct(product);

        review.setRating(
                request.getRating()
        );

        review.setComment(
                request.getComment()
        );



        review =
                reviewRepository.save(review);



        return mapToResponse(review);

    }





    // ================= GET PRODUCT REVIEWS =================


    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponse> getProductReviews(
            Long productId
    ) {


        Product product =
                productRepository.findById(productId)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Product not found"
                        )
                );



        List<Review> reviews =
                reviewRepository.findByProduct(product);



        List<ReviewResponse> responses =
                new ArrayList<>();



        for(Review review : reviews) {

            responses.add(
                    mapToResponse(review)
            );

        }


        return responses;

    }





    // ================= UPDATE REVIEW =================


    @Override
    public ReviewResponse updateReview(
            Long reviewId,
            ReviewRequest request,
            Long userId
    ) {


        Review review =
                reviewRepository.findById(reviewId)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Review not found"
                        )
                );



        if(!review.getUser()
                .getId()
                .equals(userId)) {


            throw new BadRequestException(
                    "You cannot update this review"
            );

        }



        review.setRating(
                request.getRating()
        );


        review.setComment(
                request.getComment()
        );



        return mapToResponse(
                reviewRepository.save(review)
        );

    }





    // ================= DELETE REVIEW =================


    @Override
    public void deleteReview(
            Long reviewId,
            Long userId
    ) {


        Review review =
                reviewRepository.findById(reviewId)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Review not found"
                        )
                );



        if(!review.getUser()
                .getId()
                .equals(userId)) {


            throw new BadRequestException(
                    "You cannot delete this review"
            );

        }



        reviewRepository.delete(review);

    }





    // ================= MAPPER =================


    private ReviewResponse mapToResponse(
            Review review
    ) {


        return new ReviewResponse(

                review.getId(),

                review.getProduct()
                        .getId(),

                review.getUser()
                        .getId(),

                review.getUser()
                        .getName(),

                review.getRating(),

                review.getComment(),

                review.getCreatedAt()

        );

    }

 // ================= AVERAGE RATING =================


    @Override
    @Transactional(readOnly = true)
    public Double getAverageRating(Long productId) {

        Double avg =
                reviewRepository.findAverageRating(productId);


        if(avg == null){
            return 0.0;
        }


        return Math.round(avg * 10.0) / 10.0;

    }




    // ================= REVIEW COUNT =================


    @Override
    @Transactional(readOnly = true)
    public Long getReviewCount(Long productId) {


        return reviewRepository.countReviews(productId);

    }

}
