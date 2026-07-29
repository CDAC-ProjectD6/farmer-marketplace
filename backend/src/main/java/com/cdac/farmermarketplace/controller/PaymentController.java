package com.cdac.farmermarketplace.controller;


import java.math.BigDecimal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.farmermarketplace.dto.request.PaymentVerificationRequest;
import com.cdac.farmermarketplace.dto.response.RazorpayOrderResponse;
import com.cdac.farmermarketplace.entity.Order;
import com.cdac.farmermarketplace.entity.Payment;
import com.cdac.farmermarketplace.enums.PaymentStatus;
import com.cdac.farmermarketplace.enums.OrderStatus;
import com.cdac.farmermarketplace.repository.OrderRepository;
import com.cdac.farmermarketplace.repository.PaymentRepository;
import com.cdac.farmermarketplace.entity.Cart;
import com.cdac.farmermarketplace.repository.CartRepository;
import com.cdac.farmermarketplace.repository.CartItemRepository;
import com.cdac.farmermarketplace.service.PaymentVerificationService;
import com.cdac.farmermarketplace.service.RazorpayService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@CrossOrigin
public class PaymentController {


    private final RazorpayService razorpayService;

    private final PaymentVerificationService paymentVerificationService;

    private final PaymentRepository paymentRepository;

    private final OrderRepository orderRepository;
    
    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;



    // Create Razorpay Order
    @PostMapping("/create-order")
    public ResponseEntity<RazorpayOrderResponse> createOrder(
            @RequestParam BigDecimal amount
    ) throws Exception {


        RazorpayOrderResponse response =
                razorpayService.createOrder(amount);


        return ResponseEntity.ok(response);
    }




    // Verify Razorpay Payment
    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(
            @RequestBody PaymentVerificationRequest request
    ) throws Exception {

    	System.out.println("====== VERIFY PAYMENT API CALLED ======");

        // Verify Razorpay Signature
        boolean isValid =
                paymentVerificationService.verifyPayment(
                        request.getRazorpayOrderId(),
                        request.getRazorpayPaymentId(),
                        request.getRazorpaySignature()
                );



        if(!isValid) {

            return ResponseEntity.badRequest()
                    .body("Payment verification failed");

        }



        // Fetch existing order
        Order order =
                orderRepository.findById(request.getOrderId())
                .orElseThrow(
                        () -> new RuntimeException("Order not found")
                );



        // Create Payment record
        Payment payment = new Payment();


        payment.setRazorpayOrderId(
                request.getRazorpayOrderId()
        );


        payment.setRazorpayPaymentId(
                request.getRazorpayPaymentId()
        );


        payment.setRazorpaySignature(
                request.getRazorpaySignature()
        );


        payment.setAmount(
                order.getTotalAmount()
        );


        payment.setStatus(
                PaymentStatus.SUCCESS
        );


        payment.setOrder(order);



        paymentRepository.save(payment);

        order.setStatus(OrderStatus.PAID);

        orderRepository.save(order);

     // Clear user's cart after successful payment
        Cart cart = cartRepository.findByUser(order.getUser())
                .orElse(null);

        if (cart != null) {
            cartItemRepository.deleteByCart(cart);
        }

        return ResponseEntity.ok(
                "Payment verified successfully and order updated"
        );

    }

}