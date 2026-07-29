package com.cdac.farmermarketplace.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.dto.response.OrderItemResponse;
import com.cdac.farmermarketplace.dto.response.OrderResponse;
import com.cdac.farmermarketplace.entity.Order;
import com.cdac.farmermarketplace.entity.OrderItem;
import com.cdac.farmermarketplace.enums.OrderStatus;
import com.cdac.farmermarketplace.exception.ResourceNotFoundException;
import com.cdac.farmermarketplace.repository.OrderRepository;
import com.cdac.farmermarketplace.service.AdminOrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminOrderServiceImpl implements AdminOrderService {

    private final OrderRepository orderRepository;

    // ================= GET ORDERS =================
    // Supports:
    // 1. All orders
    // 2. Status filter
    // 3. Customer filter
    // 4. Farmer filter
    // 5. Date range filter
    // 6. Pagination

    @Override
    public Page<OrderResponse> getOrders(
            OrderStatus status,
            Long customerId,
            Long farmerId,
            LocalDate fromDate,
            LocalDate toDate,
            int page,
            int size) {

        Pageable pageable = PageRequest.of(page, size);

        LocalDateTime fromDateTime =
                fromDate != null
                        ? fromDate.atStartOfDay()
                        : null;

        LocalDateTime toDateTime =
                toDate != null
                        ? toDate.atTime(23, 59, 59)
                        : null;

        Page<Order> orders =
                orderRepository.findAdminOrders(
                        status,
                        customerId,
                        farmerId,
                        fromDateTime,
                        toDateTime,
                        pageable
                );

        return orders.map(this::convertToResponse);
    }

    // ================= GET ORDER BY ID =================

    @Override
    public OrderResponse getOrderById(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id: " + orderId
                        ));

        return convertToResponse(order);
    }

    // ================= ORDER -> DTO =================

    private OrderResponse convertToResponse(Order order) {

        OrderResponse response = new OrderResponse();

        response.setOrderId(order.getId());

        if (order.getUser() != null) {
            response.setUserId(
                    order.getUser().getId()
            );
        }

        response.setSubtotal(order.getSubtotal());
        response.setTax(order.getTax());
        response.setTotalAmount(order.getTotalAmount());

        response.setShippingAddress(
                order.getShippingAddress()
        );

        response.setPincode(order.getPincode());
        response.setMobile(order.getMobile());
        response.setStatus(order.getStatus());

        if (order.getPaymentMethod() != null) {
            response.setPaymentMethod(
                    order.getPaymentMethod().name()
            );
        }

        response.setOrderDate(order.getOrderDate());

        response.setItems(
                order.getOrderItems()
                        .stream()
                        .map(this::convertItemToResponse)
                        .toList()
        );

        return response;
    }

    // ================= ORDER ITEM -> DTO =================

    private OrderItemResponse convertItemToResponse(
            OrderItem item) {

        OrderItemResponse response =
                new OrderItemResponse();

        if (item.getProduct() != null) {
            response.setProductId(
                    item.getProduct().getId()
            );
        }

        response.setQuantity(
                item.getQuantity()
        );

        response.setPrice(
                item.getPrice()
        );

        response.setTotalPrice(
                item.getTotalPrice()
        );

        return response;
    }
}