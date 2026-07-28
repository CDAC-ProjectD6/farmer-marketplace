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
public class WishlistResponseDto {

    private Long id;

    private Long productId;

    private String productName;

    private String description;

    private BigDecimal price;

    private String imageUrl;

}