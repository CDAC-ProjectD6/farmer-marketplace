package com.cdac.farmermarketplace.service;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Utils;


@Service
public class PaymentVerificationService {


	 @Value("${razorpay.key.secret}")
	    private String secret;

	 public boolean verifyPayment(
		        String razorpayOrderId,
		        String razorpayPaymentId,
		        String razorpaySignature
		) throws Exception {


		    String payload =
		            razorpayOrderId + "|" + razorpayPaymentId;


		    String generatedSignature =
		            Utils.getHash(payload, secret);


		    return generatedSignature.equals(razorpaySignature);

		}
}
