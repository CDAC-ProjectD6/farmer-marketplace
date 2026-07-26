package com.cdac.farmermarketplace.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlaceOrderRequest {

    @NotNull(message = "User Id is required")
    private Long userId;

    @NotNull(message = "Shipping Address is required")
    private String shippingAddress;

    @NotNull(message = "Payment Method is required")
    private String paymentMethod;
}
