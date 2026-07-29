package com.cdac.farmermarketplace.service;

import java.util.List;

import com.cdac.farmermarketplace.dto.response.FarmerOrderResponse;
import com.cdac.farmermarketplace.enums.OrderStatus;

public interface FarmerOrderService {

    // All farmer orders
    List<FarmerOrderResponse> getFarmerOrders(
            Long farmerId
    );

    // Farmer orders filtered by status
    List<FarmerOrderResponse> getFarmerOrdersByStatus(
            Long farmerId,
            OrderStatus status
    );

    // One farmer order
    FarmerOrderResponse getFarmerOrderById(
            Long orderId,
            Long farmerId
    );
}