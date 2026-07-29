package com.cdac.farmermarketplace.controller;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.farmermarketplace.dto.response.OrderResponse;
import com.cdac.farmermarketplace.enums.OrderStatus;
import com.cdac.farmermarketplace.service.AdminOrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminOrderController {

    private final AdminOrderService adminOrderService;

    // ================= GET ORDERS =================
    // Supports:
    // status, customer, farmer, date and pagination

    @GetMapping
    public ResponseEntity<Page<OrderResponse>> getOrders(

            @RequestParam(required = false)
            OrderStatus status,

            @RequestParam(required = false)
            Long customerId,

            @RequestParam(required = false)
            Long farmerId,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate fromDate,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate toDate,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size) {

        return ResponseEntity.ok(
                adminOrderService.getOrders(
                        status,
                        customerId,
                        farmerId,
                        fromDate,
                        toDate,
                        page,
                        size
                )
        );
    }

    // ================= GET ORDER DETAILS =================

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(
            @PathVariable Long orderId) {

        return ResponseEntity.ok(
                adminOrderService.getOrderById(orderId)
        );
    }
}