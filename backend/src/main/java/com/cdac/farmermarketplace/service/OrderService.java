package com.cdac.farmermarketplace.service;

import java.util.List;

import com.cdac.farmermarketplace.dto.request.PlaceOrderRequest;
import com.cdac.farmermarketplace.dto.response.OrderResponse;

public interface OrderService {

    OrderResponse placeOrder(PlaceOrderRequest request);

    List<OrderResponse> getOrdersByUserId(Long userId);

    OrderResponse getOrderById(Long orderId);

    void cancelOrder(Long orderId);
}
