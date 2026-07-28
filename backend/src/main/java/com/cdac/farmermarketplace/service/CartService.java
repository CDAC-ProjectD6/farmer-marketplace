package com.cdac.farmermarketplace.service;


import com.cdac.farmermarketplace.dto.request.AddToCartRequest;
import com.cdac.farmermarketplace.dto.request.UpdateCartRequest;
import com.cdac.farmermarketplace.dto.response.CartResponse;



public interface CartService {



    // Add product to logged-in user's cart
    CartResponse addToCart(
            AddToCartRequest request,
            Long userId
    );




    // Get cart of logged-in user
    CartResponse getCartByUserId(
            Long userId
    );




    // Update quantity
    CartResponse updateCart(
            UpdateCartRequest request,
            Long userId
    );




    // Remove item from cart
    void removeCartItem(
            Long cartItemId,
            Long userId
    );




    // Clear complete cart
    void clearCart(
            Long userId
    );



}