package com.cdac.farmermarketplace.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.farmermarketplace.config.SecurityUtils;
import com.cdac.farmermarketplace.dto.response.FarmerOrderResponse;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.enums.OrderStatus;
import com.cdac.farmermarketplace.service.FarmerOrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/farmer/orders")
@RequiredArgsConstructor
@PreAuthorize("hasRole('FARMER')")
public class FarmerOrderController {

    private final FarmerOrderService farmerOrderService;

    private final SecurityUtils securityUtils;


    // =========================================================
    // GET ALL / FILTER BY STATUS
    // =========================================================

    @GetMapping
    public ResponseEntity<List<FarmerOrderResponse>> getFarmerOrders(
            @RequestParam(required = false)
            OrderStatus status) {

        User farmer =
                securityUtils.getCurrentUser();


        // No status -> all farmer orders
        if (status == null) {

            return ResponseEntity.ok(
                    farmerOrderService.getFarmerOrders(
                            farmer.getId()
                    )
            );
        }


        // Status supplied -> filtered orders
        return ResponseEntity.ok(
                farmerOrderService.getFarmerOrdersByStatus(
                        farmer.getId(),
                        status
                )
        );
    }


    // =========================================================
    // GET ORDER DETAILS
    // =========================================================

    @GetMapping("/{orderId}")
    public ResponseEntity<FarmerOrderResponse> getFarmerOrderById(
            @PathVariable Long orderId) {

        User farmer =
                securityUtils.getCurrentUser();

        return ResponseEntity.ok(
                farmerOrderService.getFarmerOrderById(
                        orderId,
                        farmer.getId()
                )
        );
    }
}