package com.cdac.farmermarketplace.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.dto.response.FarmerOrderItemResponse;
import com.cdac.farmermarketplace.dto.response.FarmerOrderResponse;
import com.cdac.farmermarketplace.entity.Order;
import com.cdac.farmermarketplace.entity.OrderItem;
import com.cdac.farmermarketplace.enums.OrderStatus;
import com.cdac.farmermarketplace.exception.ResourceNotFoundException;
import com.cdac.farmermarketplace.repository.OrderItemRepository;
import com.cdac.farmermarketplace.service.FarmerOrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FarmerOrderServiceImpl implements FarmerOrderService {

    private final OrderItemRepository orderItemRepository;


    // =========================================================
    // GET ALL FARMER ORDERS
    // =========================================================

    @Override
    public List<FarmerOrderResponse> getFarmerOrders(
            Long farmerId) {

        List<OrderItem> orderItems =
                orderItemRepository
                        .findOrderItemsByFarmerId(farmerId);

        return groupOrders(orderItems);
    }


    // =========================================================
    // FILTER FARMER ORDERS BY STATUS
    // =========================================================

    @Override
    public List<FarmerOrderResponse> getFarmerOrdersByStatus(
            Long farmerId,
            OrderStatus status) {

        List<OrderItem> orderItems =
                orderItemRepository
                        .findOrderItemsByFarmerIdAndStatus(
                                farmerId,
                                status
                        );

        return groupOrders(orderItems);
    }


    // =========================================================
    // GET ONE FARMER ORDER
    // =========================================================

    @Override
    public FarmerOrderResponse getFarmerOrderById(
            Long orderId,
            Long farmerId) {

        List<OrderItem> orderItems =
                orderItemRepository
                        .findByOrderIdAndFarmerId(
                                orderId,
                                farmerId
                        );

        if (orderItems.isEmpty()) {

            throw new ResourceNotFoundException(
                    "Order not found for this farmer"
            );
        }

        return convertToFarmerOrderResponse(orderItems);
    }


    // =========================================================
    // GROUP ORDER ITEMS BY ORDER
    // =========================================================

    private List<FarmerOrderResponse> groupOrders(
            List<OrderItem> orderItems) {

        Map<Long, List<OrderItem>> groupedOrders =
                new LinkedHashMap<>();

        for (OrderItem item : orderItems) {

            Long orderId =
                    item.getOrder().getId();

            groupedOrders
                    .computeIfAbsent(
                            orderId,
                            key -> new ArrayList<>()
                    )
                    .add(item);
        }


        List<FarmerOrderResponse> responses =
                new ArrayList<>();

        for (List<OrderItem> items :
                groupedOrders.values()) {

            responses.add(
                    convertToFarmerOrderResponse(items)
            );
        }

        return responses;
    }


    // =========================================================
    // ENTITY -> FARMER ORDER DTO
    // =========================================================

    private FarmerOrderResponse convertToFarmerOrderResponse(
            List<OrderItem> orderItems) {

        Order order =
                orderItems.get(0).getOrder();

        FarmerOrderResponse response =
                new FarmerOrderResponse();


        // Order
        response.setOrderId(order.getId());

        response.setOrderDate(
                order.getOrderDate()
        );

        response.setStatus(
                order.getStatus()
        );

        response.setPaymentMethod(
                order.getPaymentMethod().name()
        );


        // Customer
        response.setCustomerId(
                order.getUser().getId()
        );

        response.setCustomerName(
                order.getUser().getName()
        );

        response.setCustomerEmail(
                order.getUser().getEmail()
        );

        response.setMobile(
                order.getMobile()
        );


        // Shipping
        response.setShippingAddress(
                order.getShippingAddress()
        );

        response.setPincode(
                order.getPincode()
        );


        // Farmer items
        List<FarmerOrderItemResponse> items =
                orderItems.stream()
                        .map(this::convertItemToResponse)
                        .toList();

        response.setItems(items);


        // Total belonging only to this farmer
        BigDecimal farmerTotal =
                orderItems.stream()
                        .map(OrderItem::getTotalPrice)
                        .reduce(
                                BigDecimal.ZERO,
                                BigDecimal::add
                        );

        response.setFarmerTotal(farmerTotal);

        return response;
    }


    // =========================================================
    // ORDER ITEM -> DTO
    // =========================================================

    private FarmerOrderItemResponse convertItemToResponse(
            OrderItem item) {

        FarmerOrderItemResponse response =
                new FarmerOrderItemResponse();

        response.setOrderItemId(
                item.getOrderItemId()
        );

        response.setProductId(
                item.getProduct().getId()
        );

        response.setProductName(
                item.getProduct().getName()
        );

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