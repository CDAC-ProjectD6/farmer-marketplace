package com.cdac.farmermarketplace.service;

import java.time.LocalDate;

import org.springframework.data.domain.Page;

import com.cdac.farmermarketplace.dto.response.OrderResponse;
import com.cdac.farmermarketplace.enums.OrderStatus;

public interface AdminOrderService {

    Page<OrderResponse> getOrders(
            OrderStatus status,
            Long customerId,
            Long farmerId,
            LocalDate fromDate,
            LocalDate toDate,
            int page,
            int size
    );

    OrderResponse getOrderById(Long orderId);
}