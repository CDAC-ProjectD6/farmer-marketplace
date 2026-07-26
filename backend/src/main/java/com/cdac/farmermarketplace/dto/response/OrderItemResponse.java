package com.cdac.farmermarketplace.dto.response;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderItemResponse {

    private Long orderItemId;

    private Long productId;

    private Integer quantity;

    private BigDecimal price;

    private BigDecimal subtotal;
}
