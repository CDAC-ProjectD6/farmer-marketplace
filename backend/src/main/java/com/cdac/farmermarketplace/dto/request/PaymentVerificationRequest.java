package com.cdac.farmermarketplace.dto.request;




import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PaymentVerificationRequest {


    private String razorpayOrderId;

    private String razorpayPaymentId;

    private String razorpaySignature;

    private Long orderId;

}
