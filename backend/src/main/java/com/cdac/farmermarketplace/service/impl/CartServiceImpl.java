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
import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.entity.User;


import com.cdac.farmermarketplace.exception.ResourceNotFoundException;


import com.cdac.farmermarketplace.repository.CartItemRepository;
import com.cdac.farmermarketplace.repository.CartRepository;
import com.cdac.farmermarketplace.repository.ProductRepository;
import com.cdac.farmermarketplace.repository.UserRepository;


import com.cdac.farmermarketplace.service.CartService;


import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {


    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;




    @Override
    public CartResponse addToCart(
            AddToCartRequest request,
            Long userId) {


        User user =
                userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );



        Product product =
                productRepository.findById(
                        request.getProductId()
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found"
                        )
                );



        Cart cart =
                cartRepository.findByUser(user)
                .orElseGet(() -> {

                    Cart newCart = new Cart();

                    newCart.setUser(user);

                    return cartRepository.save(newCart);

                });



        CartItem cartItem =
                cartItemRepository
                .findByCartAndProduct(cart, product)
                .orElse(null);



        if(cartItem == null){


            cartItem = new CartItem();

            cartItem.setCart(cart);

            cartItem.setProduct(product);

            cartItem.setQuantity(
                    request.getQuantity()
            );

            cartItem.setPrice(
                    product.getPrice()
            );


        }
        else{


            cartItem.setQuantity(
                    cartItem.getQuantity()
                    +
                    request.getQuantity()
            );

        }



        cartItem.setTotalPrice(

                cartItem.getPrice()
                .multiply(
                        BigDecimal.valueOf(
                                cartItem.getQuantity()
                        )
                )

        );



        cartItemRepository.save(cartItem);



        return getCartByUserId(userId);

    }







    @Override
    @Transactional(readOnly = true)
    public CartResponse getCartByUserId(
            Long userId) {



        Cart cart =
                cartRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cart not found"
                        )
                );



        List<CartItem> items =
                cartItemRepository.findByCart(cart);



        List<CartItemResponse> responseItems =
                new ArrayList<>();


        BigDecimal totalAmount =
                BigDecimal.ZERO;



        for(CartItem item : items){


            CartItemResponse response =
                    new CartItemResponse();


            response.setCartItemId(
                    item.getCartItemId()
            );


            response.setProductId(
                    item.getProduct().getId()
            );
            
            response.setProductName(
                    item.getProduct().getName()
            );

            response.setImageUrl(
                    item.getProduct().getImageUrl()
            );


            response.setQuantity(
                    item.getQuantity()
            );


            response.setPrice(
                    item.getPrice()
            );


            response.setTotalPrice(
                    item.getTotalPrice()
            );


            responseItems.add(response);



            totalAmount =
                    totalAmount.add(
                            item.getTotalPrice()
                    );

        }



        CartResponse response =
                new CartResponse();


        response.setCartId(
                cart.getId()
        );


        response.setUserId(
                userId
        );


        response.setItems(
                responseItems
        );


        response.setTotalAmount(
                totalAmount
        );


        return response;

    }







    @Override
    public CartResponse updateCart(
            UpdateCartRequest request,
            Long userId) {



        CartItem cartItem =
                cartItemRepository.findById(
                        request.getCartItemId()
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cart Item not found"
                        )
                );



        if(!cartItem.getCart()
                .getUser()
                .getId()
                .equals(userId)){

            throw new ResourceNotFoundException(
                    "Cart item does not belong to user"
            );

        }



        cartItem.setQuantity(
                request.getQuantity()
        );



        cartItem.setTotalPrice(

                cartItem.getPrice()
                .multiply(
                        BigDecimal.valueOf(
                                request.getQuantity()
                        )
                )

        );



        cartItemRepository.save(cartItem);



        return getCartByUserId(userId);

    }







    @Override
    public void removeCartItem(
            Long cartItemId,
            Long userId) {



        CartItem cartItem =
                cartItemRepository.findById(cartItemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cart Item not found"
                        )
                );



        if(!cartItem.getCart()
                .getUser()
                .getId()
                .equals(userId)){


            throw new ResourceNotFoundException(
                    "Cart item does not belong to user"
            );

        }



        cartItemRepository.delete(cartItem);

    }







    @Override
    public void clearCart(
            Long userId) {



        Cart cart =
                cartRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cart not found"
                        )
                );



        cartItemRepository.deleteByCart(cart);

    }


}