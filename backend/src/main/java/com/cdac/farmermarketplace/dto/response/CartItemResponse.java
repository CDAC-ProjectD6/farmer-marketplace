package com.cdac.farmermarketplace.dto.response;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponse {

    private Long cartItemId;

    private Long productId;

    private Integer quantity;

    private BigDecimal price;

    private BigDecimal totalPrice;
}