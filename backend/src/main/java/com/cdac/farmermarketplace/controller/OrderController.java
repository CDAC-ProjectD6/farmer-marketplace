package com.cdac.farmermarketplace.controller;


import java.util.List;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.cdac.farmermarketplace.config.SecurityUtils;
import com.cdac.farmermarketplace.dto.request.PlaceOrderRequest;
import com.cdac.farmermarketplace.dto.response.OrderResponse;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.service.OrderService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin("*")
public class OrderController {



    private final OrderService orderService;

    private final SecurityUtils securityUtils;





    // Place Order
    @PostMapping("/place")
    public ResponseEntity<OrderResponse> placeOrder(
    		 @Valid @RequestBody PlaceOrderRequest request
    ){

        User user = securityUtils.getCurrentUser();


        return new ResponseEntity<>(

                orderService.placeOrder(
                        request,
                        user.getId()
                ),

                HttpStatus.CREATED
        );

    }







    // Get Order By Id
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrder(
            @PathVariable Long orderId
    ){

        User user = securityUtils.getCurrentUser();

        return ResponseEntity.ok(
                orderService.getOrderById(
                        orderId,
                        user.getId()
                )
        );

    }







    // User Order History
    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderResponse>> getMyOrders(){

        User user = securityUtils.getCurrentUser();


        return ResponseEntity.ok(
                orderService.getOrdersByUserId(
                        user.getId()
                )
        );

    }








    // Cancel Order
    @PutMapping("/cancel/{orderId}")
    public ResponseEntity<String> cancelOrder(
            @PathVariable Long orderId
    ){

        User user = securityUtils.getCurrentUser();

        orderService.cancelOrder(
                orderId,
                user.getId()
        );

        return ResponseEntity.ok(
                "Order cancelled successfully"
        );

    }


}