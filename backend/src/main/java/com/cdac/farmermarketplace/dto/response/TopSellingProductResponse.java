package com.cdac.farmermarketplace.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TopSellingProductResponse {

    private Long productId;

    private String productName;

    private Long quantitySold;
}