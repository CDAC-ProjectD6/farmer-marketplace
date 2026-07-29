package com.cdac.farmermarketplace.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cdac.farmermarketplace.entity.Order;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.enums.OrderStatus;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // ================= CUSTOMER ORDER MANAGEMENT =================

    List<Order> findByUser(User user);


    // ================= ADMIN DASHBOARD =================

    // Total sales
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o")
    BigDecimal getTotalSales();

    // Count orders by status
    long countByStatus(OrderStatus status);

    // Recent 5 orders
    List<Order> findTop5ByOrderByOrderDateDesc();


    // ================= ADMIN ORDER MANAGEMENT =================

    @Query("""
            SELECT DISTINCT o
            FROM Order o
            LEFT JOIN o.orderItems oi
            LEFT JOIN oi.product p
            WHERE (:status IS NULL OR o.status = :status)
              AND (:customerId IS NULL OR o.user.id = :customerId)
              AND (:farmerId IS NULL OR p.farmer.id = :farmerId)
              AND (:fromDate IS NULL OR o.orderDate >= :fromDate)
              AND (:toDate IS NULL OR o.orderDate <= :toDate)
            ORDER BY o.orderDate DESC
            """)
    Page<Order> findAdminOrders(
            @Param("status") OrderStatus status,
            @Param("customerId") Long customerId,
            @Param("farmerId") Long farmerId,
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDate") LocalDateTime toDate,
            Pageable pageable
    );
}