package com.cdac.farmermarketplace.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cdac.farmermarketplace.entity.Order;
import com.cdac.farmermarketplace.entity.OrderItem;
import com.cdac.farmermarketplace.enums.OrderStatus;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    // ================= CUSTOMER / ORDER =================

    List<OrderItem> findByOrder(Order order);


    // ================= FARMER ORDER MANAGEMENT =================

    // All orders containing logged-in farmer's products
    @Query("""
           SELECT oi
           FROM OrderItem oi
           JOIN FETCH oi.order o
           JOIN FETCH oi.product p
           JOIN FETCH o.user u
           WHERE p.farmer.id = :farmerId
           ORDER BY o.orderDate DESC
           """)
    List<OrderItem> findOrderItemsByFarmerId(
            @Param("farmerId") Long farmerId
    );


    // Farmer's products from one particular order
    @Query("""
           SELECT oi
           FROM OrderItem oi
           JOIN FETCH oi.order o
           JOIN FETCH oi.product p
           JOIN FETCH o.user u
           WHERE o.id = :orderId
           AND p.farmer.id = :farmerId
           """)
    List<OrderItem> findByOrderIdAndFarmerId(
            @Param("orderId") Long orderId,
            @Param("farmerId") Long farmerId
    );


    // Farmer orders filtered by order status
    @Query("""
           SELECT oi
           FROM OrderItem oi
           JOIN FETCH oi.order o
           JOIN FETCH oi.product p
           JOIN FETCH o.user u
           WHERE p.farmer.id = :farmerId
           AND o.status = :status
           ORDER BY o.orderDate DESC
           """)
    List<OrderItem> findOrderItemsByFarmerIdAndStatus(
            @Param("farmerId") Long farmerId,
            @Param("status") OrderStatus status
    );


    // ================= ADMIN DASHBOARD =================

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