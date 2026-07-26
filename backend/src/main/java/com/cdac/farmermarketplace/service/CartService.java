package com.cdac.farmermarketplace.service;

import com.cdac.farmermarketplace.dto.request.AddToCartRequest;
import com.cdac.farmermarketplace.dto.request.UpdateCartRequest;
import com.cdac.farmermarketplace.dto.response.CartResponse;

public interface CartService {

    CartResponse addToCart(AddToCartRequest request);

    CartResponse getCartByUserId(Long userId);

    CartResponse updateCart(UpdateCartRequest request);

    void removeCartItem(Long cartItemId);

    void clearCart(Long userId);
}
