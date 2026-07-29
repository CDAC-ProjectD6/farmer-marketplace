package com.cdac.farmermarketplace.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.farmermarketplace.entity.Cart;
import com.cdac.farmermarketplace.entity.CartItem;
import com.cdac.farmermarketplace.entity.Product;

import jakarta.transaction.Transactional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByCart(Cart cart);

    Optional<CartItem> findByCartAndProduct(
            Cart cart,
            Product product
    );

    @Transactional
    void deleteByCart(Cart cart);
}