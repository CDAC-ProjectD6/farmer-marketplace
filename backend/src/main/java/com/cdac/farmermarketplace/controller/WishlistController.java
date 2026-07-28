package com.cdac.farmermarketplace.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.farmermarketplace.dto.response.WishlistResponseDto;
import com.cdac.farmermarketplace.service.WishlistService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {


    private final WishlistService wishlistService;



    // ================= GET USER WISHLIST =================

    @GetMapping
    public ResponseEntity<List<WishlistResponseDto>> getWishlist(
            // temporary email parameter
            // later we will replace with JWT authentication
            String email
    ) {


        return ResponseEntity.ok(
                wishlistService.getWishlist(email)
        );
    }



    // ================= ADD TO WISHLIST =================

    @PostMapping("/{productId}")
    public ResponseEntity<WishlistResponseDto> addToWishlist(

            @PathVariable Long productId,

            String email
    ) {


        return new ResponseEntity<>(

                wishlistService.addToWishlist(
                        productId,
                        email
                ),

                HttpStatus.CREATED
        );
    }



    // ================= REMOVE FROM WISHLIST =================

    @DeleteMapping("/{productId}")
    public ResponseEntity<String> removeFromWishlist(

            @PathVariable Long productId,

            String email
    ) {


        wishlistService.removeFromWishlist(
                productId,
                email
        );


        return ResponseEntity.ok(
                "Product removed from wishlist"
        );
    }

}