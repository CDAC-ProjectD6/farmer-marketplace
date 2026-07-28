package com.cdac.farmermarketplace.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cdac.farmermarketplace.entity.Order;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.enums.OrderStatus;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);

    // Total sales
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o")
    BigDecimal getTotalSales();

    // Count orders by status
    long countByStatus(OrderStatus status);
    
    List<Order> findTop5ByOrderByOrderDateDesc();
}