package com.cdac.farmermarketplace.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.cdac.farmermarketplace.enums.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecentOrderResponse {

    private Long orderId;

    private String customerName;

    private BigDecimal totalAmount;

    private OrderStatus status;

    private LocalDateTime orderDate;
}