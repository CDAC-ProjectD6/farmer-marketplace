package com.cdac.farmermarketplace.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.cdac.farmermarketplace.enums.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FarmerOrderResponse {

    private Long orderId;

    // Customer details
    private Long customerId;

    private String customerName;

    private String customerEmail;

    private String mobile;

    // Delivery details
    private String shippingAddress;

    private String pincode;

    // Order details
    private LocalDateTime orderDate;

    private OrderStatus status;

    private String paymentMethod;

    // Total only for this farmer's products
    private BigDecimal farmerTotal;

    // Only products belonging to logged-in farmer
    private List<FarmerOrderItemResponse> items;
}