package com.cdac.farmermarketplace.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.farmermarketplace.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

}
