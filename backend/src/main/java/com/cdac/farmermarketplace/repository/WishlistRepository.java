package com.cdac.farmermarketplace.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.entity.Wishlist;


public interface WishlistRepository extends JpaRepository<Wishlist, Long> {


    // Get logged-in user's wishlist
    List<Wishlist> findByUser(User user);


    // Check duplicate wishlist entry
    boolean existsByUserAndProduct(
            User user,
            Product product
    );


    // Remove product from wishlist
    Optional<Wishlist> findByUserAndProduct(
            User user,
            Product product
    );


    // Delete directly
    void deleteByUserAndProduct(
            User user,
            Product product
    );
}
