package com.cdac.farmermarketplace.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.farmermarketplace.config.SecurityUtils;
import com.cdac.farmermarketplace.dto.request.AddToCartRequest;
import com.cdac.farmermarketplace.dto.request.UpdateCartRequest;
import com.cdac.farmermarketplace.dto.response.CartResponse;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.service.CartService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Validated
public class CartController {


    private final CartService cartService;
    private final SecurityUtils securityUtils;



    // ADD PRODUCT TO CART
    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCart(
            @Valid @RequestBody AddToCartRequest request) {


        User user = securityUtils.getCurrentUser();


        return new ResponseEntity<>(
                cartService.addToCart(
                        request,
                        user.getId()
                ),
                HttpStatus.CREATED
        );
    }



    // GET CURRENT USER CART
    @GetMapping
    public ResponseEntity<CartResponse> getCart() {


        User user = securityUtils.getCurrentUser();


        return ResponseEntity.ok(
                cartService.getCartByUserId(
                        user.getId()
                )
        );
    }



    // UPDATE CART QUANTITY
    @PutMapping("/update")
    public ResponseEntity<CartResponse> updateCart(
            @Valid @RequestBody UpdateCartRequest request) {


        User user = securityUtils.getCurrentUser();


        return ResponseEntity.ok(
                cartService.updateCart(
                        request,
                        user.getId()
                )
        );
    }



    // REMOVE SINGLE CART ITEM
    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<String> removeCartItem(
            @PathVariable Long cartItemId) {


        User user = securityUtils.getCurrentUser();


        cartService.removeCartItem(
                cartItemId,
                user.getId()
        );


        return ResponseEntity.ok(
                "Cart Item Removed Successfully"
        );
    }



    // CLEAR COMPLETE CART
    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart() {


        User user = securityUtils.getCurrentUser();


        cartService.clearCart(
                user.getId()
        );


        return ResponseEntity.ok(
                "Cart Cleared Successfully"
        );
    }

}