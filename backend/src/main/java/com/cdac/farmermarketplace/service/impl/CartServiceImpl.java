package com.cdac.farmermarketplace.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.farmermarketplace.dto.request.AddToCartRequest;
import com.cdac.farmermarketplace.dto.request.UpdateCartRequest;
import com.cdac.farmermarketplace.dto.response.CartItemResponse;
import com.cdac.farmermarketplace.dto.response.CartResponse;
import com.cdac.farmermarketplace.entity.Cart;
import com.cdac.farmermarketplace.entity.CartItem;
import com.cdac.farmermarketplace.exception.ResourceNotFoundException;
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

        Cart cart = cartRepository.findByUserId(request.getUserId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(request.getUserId());
                    return cartRepository.save(newCart);
                });

        CartItem cartItem = cartItemRepository
                .findByCartIdAndProductId(cart.getId(), request.getProductId())
                .orElse(null);

        // TODO Replace with ProductService/ProductRepository
        BigDecimal productPrice = BigDecimal.valueOf(100);

        if (cartItem == null) {

            cartItem = new CartItem();
            cartItem.setCartId(cart.getId());
            cartItem.setProductId(request.getProductId());
            cartItem.setQuantity(request.getQuantity());
            cartItem.setPrice(productPrice);
            cartItem.setTotalPrice(productPrice.multiply(BigDecimal.valueOf(request.getQuantity())));

        } else {

            cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
            cartItem.setTotalPrice(
                    cartItem.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
        }

        cartItemRepository.save(cartItem);

        return getCartByUserId(request.getUserId());
    }

    @Override
    @Transactional(readOnly = true)
    public CartResponse getCartByUserId(Long userId) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        List<CartItem> items = cartItemRepository.findByCartId(cart.getId());

        List<CartItemResponse> responseItems = new ArrayList<>();

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (CartItem item : items) {

            CartItemResponse response = new CartItemResponse();

            response.setCartItemId(item.getCartItemId());
            response.setProductId(item.getProductId());
            response.setQuantity(item.getQuantity());
            response.setPrice(item.getPrice());
            response.setTotalPrice(item.getTotalPrice());

            responseItems.add(response);

            totalAmount = totalAmount.add(item.getTotalPrice());
        }

        CartResponse response = new CartResponse();

        response.setCartId(cart.getId());
        response.setUserId(cart.getUserId());
        response.setItems(responseItems);
        response.setTotalAmount(totalAmount);

        return response;
    }

    @Override
    public CartResponse updateCart(UpdateCartRequest request) {

        CartItem cartItem = cartItemRepository.findById(request.getCartItemId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart Item not found"));

        cartItem.setQuantity(request.getQuantity());

        cartItem.setTotalPrice(
                cartItem.getPrice().multiply(BigDecimal.valueOf(request.getQuantity())));

        cartItemRepository.save(cartItem);

        Cart cart = cartRepository.findById(cartItem.getCartId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        return getCartByUserId(cart.getUserId());
    }

    @Override
    public void removeCartItem(Long cartItemId) {

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart Item not found"));

        cartItemRepository.delete(cartItem);
    }

    @Override
    public void clearCart(Long userId) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        cartItemRepository.deleteByCartId(cart.getId());
    }
}