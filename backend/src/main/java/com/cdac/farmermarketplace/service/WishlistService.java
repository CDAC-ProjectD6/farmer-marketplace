package com.cdac.farmermarketplace.service;

import java.util.List;

import com.cdac.farmermarketplace.dto.response.WishlistResponseDto;


public interface WishlistService {


    // Add product to wishlist
    WishlistResponseDto addToWishlist(
            Long productId,
            String email
    );


    // Get logged-in user's wishlist
    List<WishlistResponseDto> getWishlist(
            String email
    );


    // Remove product from wishlist
    void removeFromWishlist(
            Long productId,
            String email
    );

}