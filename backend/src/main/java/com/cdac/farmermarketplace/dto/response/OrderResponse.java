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
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {

    private Long orderId;

    private Long userId;

    private BigDecimal totalAmount;

    private OrderStatus status;

    private LocalDateTime orderDate;

    private List<OrderItemResponse> items;
}
