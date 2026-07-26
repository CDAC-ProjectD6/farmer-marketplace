package com.cdac.farmermarketplace.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlaceOrderRequest {

    @NotNull(message = "User Id is required")
    private Long userId;

    @NotBlank(message = "Shipping Address is required")
    private String shippingAddress;

    @NotBlank(message = "Pincode is required")
    private String pincode;

    @NotBlank(message = "Mobile Number is required")
    private String mobile;

    @NotBlank(message = "Payment Method is required")
    private String paymentMethod;
}