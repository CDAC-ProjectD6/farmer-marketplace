package com.cdac.farmermarketplace.service;

import java.math.BigDecimal;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.dto.response.RazorpayOrderResponse;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service
public class RazorpayService {

    private final RazorpayClient razorpayClient;

    @Value("${razorpay.key.id}")
    private String keyId;


    // RazorpayClient comes from RazorpayConfig
    public RazorpayService(RazorpayClient razorpayClient) {
        this.razorpayClient = razorpayClient;
    }


    public RazorpayOrderResponse createOrder(
            BigDecimal amount) throws Exception {

        JSONObject options = new JSONObject();

        // Razorpay expects amount in paise
        options.put(
                "amount",
                amount.multiply(BigDecimal.valueOf(100)).longValue()
        );

        options.put("currency", "INR");

        options.put(
                "receipt",
                "receipt_" + System.currentTimeMillis()
        );


        // Create Razorpay order
        Order order =
                razorpayClient.orders.create(options);


        return new RazorpayOrderResponse(
                order.get("id"),
                keyId,
                options.getLong("amount"),
                "INR"
        );
    }
}