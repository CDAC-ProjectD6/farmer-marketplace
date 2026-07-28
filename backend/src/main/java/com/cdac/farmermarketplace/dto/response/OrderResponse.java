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
public class OrderResponse {

    private Long orderId;

    private Long userId;

    private BigDecimal subtotal;

    private BigDecimal tax;

    private BigDecimal totalAmount;

    private String shippingAddress;

    private String pincode;

    private String mobile;

    private OrderStatus status;

    private String paymentMethod;

    private LocalDateTime orderDate;

    private List<OrderItemResponse> items;
}