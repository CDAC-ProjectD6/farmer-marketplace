package com.cdac.farmermarketplace.controller;


import java.util.List;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.cdac.farmermarketplace.config.SecurityUtils;
import com.cdac.farmermarketplace.dto.request.ReviewRequest;
import com.cdac.farmermarketplace.dto.response.ReviewResponse;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.service.ReviewService;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReviewController {



    private final ReviewService reviewService;

    private final SecurityUtils securityUtils;




    // ================= ADD REVIEW =================

    @PostMapping("/product/{productId}")
    public ResponseEntity<ReviewResponse> addReview(

            @PathVariable Long productId,

            @Valid
            @RequestBody ReviewRequest request

    ){


        User user =
                securityUtils.getCurrentUser();



        return new ResponseEntity<>(

                reviewService.addReview(
                        productId,
                        request,
                        user.getId()
                ),

                HttpStatus.CREATED

        );

    }





    // ================= GET PRODUCT REVIEWS =================


    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewResponse>> getReviews(

            @PathVariable Long productId

    ){


        return ResponseEntity.ok(

                reviewService.getProductReviews(
                        productId
                )

        );

    }





    // ================= UPDATE REVIEW =================


    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> updateReview(

            @PathVariable Long reviewId,

            @Valid
            @RequestBody ReviewRequest request

    ){


        User user =
                securityUtils.getCurrentUser();



        return ResponseEntity.ok(

                reviewService.updateReview(
                        reviewId,
                        request,
                        user.getId()
                )

        );

    }





    // ================= DELETE REVIEW =================


    @DeleteMapping("/{reviewId}")
    public ResponseEntity<String> deleteReview(

            @PathVariable Long reviewId

    ){


        User user =
                securityUtils.getCurrentUser();



        reviewService.deleteReview(
                reviewId,
                user.getId()
        );



        return ResponseEntity.ok(
                "Review deleted successfully"
        );

    }


}