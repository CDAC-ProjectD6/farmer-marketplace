package com.cdac.farmermarketplace.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.farmermarketplace.dto.response.WishlistResponseDto;
import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.entity.Wishlist;
import com.cdac.farmermarketplace.repository.ProductRepository;
import com.cdac.farmermarketplace.repository.UserRepository;
import com.cdac.farmermarketplace.repository.WishlistRepository;
import com.cdac.farmermarketplace.service.WishlistService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
@Transactional
public class WishlistServiceImpl implements WishlistService {


    private final WishlistRepository wishlistRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;



    // ================= ADD TO WISHLIST =================

    @Override
    public WishlistResponseDto addToWishlist(
            Long productId,
            String email
    ) {


        User user = getUser(email);


        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found"
                        )
                );


        boolean exists =
                wishlistRepository
                        .existsByUserAndProduct(
                                user,
                                product
                        );


        if (exists) {

            throw new RuntimeException(
                    "Product already exists in wishlist"
            );
        }


        Wishlist wishlist =
                new Wishlist(
                        user,
                        product
                );


        Wishlist saved =
                wishlistRepository.save(wishlist);


        return mapToDto(saved);
    }



    // ================= GET USER WISHLIST =================

    @Override
    @Transactional(readOnly = true)
    public List<WishlistResponseDto> getWishlist(
            String email
    ) {


        User user = getUser(email);


        return wishlistRepository
                .findByUser(user)
                .stream()
                .map(this::mapToDto)
                .toList();

    }



    // ================= REMOVE FROM WISHLIST =================

    @Override
    public void removeFromWishlist(
            Long productId,
            String email
    ) {


        User user = getUser(email);


        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found"
                        )
                );


        wishlistRepository.deleteByUserAndProduct(
                user,
                product
        );

    }



    // ================= GET USER =================

    private User getUser(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );
    }



    // ================= ENTITY TO DTO =================

    private WishlistResponseDto mapToDto(
            Wishlist wishlist
    ) {


        Product product =
                wishlist.getProduct();


        return new WishlistResponseDto(

                wishlist.getId(),

                product.getId(),

                product.getName(),

                product.getDescription(),

                product.getPrice(),

                product.getImageUrl()
        );
    }

}