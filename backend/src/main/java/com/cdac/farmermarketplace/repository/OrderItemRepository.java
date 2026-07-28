package com.cdac.farmermarketplace.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cdac.farmermarketplace.entity.Order;
import com.cdac.farmermarketplace.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrder(Order order);

    // Admin Dashboard - Top selling products
    @Query("""
           SELECT oi.product.id,
                  oi.product.name,
                  SUM(oi.quantity)
           FROM OrderItem oi
           GROUP BY oi.product.id, oi.product.name
           ORDER BY SUM(oi.quantity) DESC
           """)
    List<Object[]> findTopSellingProducts(Pageable pageable);
}