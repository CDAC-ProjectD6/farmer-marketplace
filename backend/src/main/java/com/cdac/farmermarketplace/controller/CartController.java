package com.cdac.farmermarketplace.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.cdac.farmermarketplace.dto.request.AddToCartRequest;
import com.cdac.farmermarketplace.dto.request.UpdateCartRequest;
import com.cdac.farmermarketplace.dto.response.CartResponse;
import com.cdac.farmermarketplace.service.CartService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Validated
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCart(
            @Valid @RequestBody AddToCartRequest request) {


        System.out.println("Inside Add To Cart Controller");
        
        return new ResponseEntity<>(
                cartService.addToCart(request),
                HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CartResponse> getCart(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                cartService.getCartByUserId(userId));
    }

    @PutMapping("/update")
    public ResponseEntity<CartResponse> updateCart(
            @Valid @RequestBody UpdateCartRequest request) {

        return ResponseEntity.ok(
                cartService.updateCart(request));
    }

    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<String> removeCartItem(
            @PathVariable Long cartItemId) {

        cartService.removeCartItem(cartItemId);

        return ResponseEntity.ok("Cart Item Removed Successfully");
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<String> clearCart(
            @PathVariable Long userId) {

        cartService.clearCart(userId);

        return ResponseEntity.ok("Cart Cleared Successfully");
    }
}
