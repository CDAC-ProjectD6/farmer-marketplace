package com.cdac.farmermarketplace.dto.request;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlaceOrderRequest {


    @NotBlank(message = "Shipping Address is required")
    private String shippingAddress;


    @NotBlank(message = "Pincode is required")
    private String pincode;


    @NotBlank(message = "Mobile Number is required")
    private String mobile;


    @NotBlank(message = "Payment Method is required")
    private String paymentMethod;


}