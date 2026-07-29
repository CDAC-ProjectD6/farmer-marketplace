package com.cdac.farmermarketplace.dto.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class RazorpayOrderResponse {


    private String razorpayOrderId;

    private String key;

    private Long amount;

    private String currency;


}