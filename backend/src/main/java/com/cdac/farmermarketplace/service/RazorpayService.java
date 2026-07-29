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


    @Value("${razorpay.key.id}")
    private String keyId;


    @Value("${razorpay.key.secret}")
    private String secret;



    public RazorpayOrderResponse createOrder(BigDecimal amount) throws Exception {


        RazorpayClient client =
                new RazorpayClient(keyId, secret);



        JSONObject options = new JSONObject();

        options.put(
                "amount",
                amount.multiply(BigDecimal.valueOf(100)).longValue()
        );


        options.put(
                "currency",
                "INR"
        );


        options.put(
                "receipt",
                "receipt_" + System.currentTimeMillis()
        );



        Order order = client.orders.create(options);



        return new RazorpayOrderResponse(

                order.get("id"),

                keyId,

                options.getLong("amount"),

                "INR"

        );

    }


}