package com.cdac.farmermarketplace.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cdac.farmermarketplace.entity.ProductStockHistory;
import com.cdac.farmermarketplace.service.ProductStockHistoryService;

@RestController
@RequestMapping("/api/product-stock-history")
@CrossOrigin(origins = "*")
public class ProductStockHistoryController {

    private final ProductStockHistoryService productStockHistoryService;

    public ProductStockHistoryController(
            ProductStockHistoryService productStockHistoryService) {

        this.productStockHistoryService = productStockHistoryService;
    }

    // Create stock history - Farmer or Admin
    @PreAuthorize("hasAnyRole('FARMER', 'ADMIN')")
    @PostMapping
    public ResponseEntity<ProductStockHistory> saveHistory(
            @RequestBody ProductStockHistory history) {

        return new ResponseEntity<>(
                productStockHistoryService.saveStockHistory(history),
                HttpStatus.CREATED
        );
    }

    // View stock history - Farmer or Admin
    // FIX: Changed from @RequestBody to @PathVariable
    @PreAuthorize("hasAnyRole('FARMER', 'ADMIN')")
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ProductStockHistory>> getHistory(
            @PathVariable Long productId) {

        return ResponseEntity.ok(
                productStockHistoryService.getStockHistoryByProductId(productId)
        );
    }
}