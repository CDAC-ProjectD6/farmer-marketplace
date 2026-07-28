package com.cdac.farmermarketplace.service;

import java.util.List;

import com.cdac.farmermarketplace.dto.request.PlaceOrderRequest;
import com.cdac.farmermarketplace.dto.response.OrderResponse;


public interface OrderService {


    // Place order for logged-in user
    OrderResponse placeOrder(
            PlaceOrderRequest request,
            Long userId
    );



    // Get order by id
    OrderResponse getOrderById(
            Long orderId,
            Long userId
    );



    // Get logged-in user's orders
    List<OrderResponse> getOrdersByUserId(
            Long userId
    );



    // Cancel order
    void cancelOrder(
            Long orderId,
            Long userId
    );


}