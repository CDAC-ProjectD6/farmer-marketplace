package com.cdac.farmermarketplace.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.farmermarketplace.dto.request.AddToCartRequest;
import com.cdac.farmermarketplace.dto.request.UpdateCartRequest;
import com.cdac.farmermarketplace.dto.response.CartResponse;
import com.cdac.farmermarketplace.repository.CartItemRepository;
import com.cdac.farmermarketplace.repository.CartRepository;
import com.cdac.farmermarketplace.service.CartService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {

	  private final CartRepository cartRepository;
	    private final CartItemRepository cartItemRepository;
	    
	@Override
	public CartResponse addToCart(AddToCartRequest request) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CartResponse getCartByUserId(Long userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CartResponse updateCart(UpdateCartRequest request) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void removeCartItem(Long cartItemId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void clearCart(Long userId) {
		// TODO Auto-generated method stub
	}

	
	
	// TODO: Verify user exists using UserRepository

	// TODO: Fetch product price from ProductRepository

	// TODO: Calculate subtotal using actual product price
}
