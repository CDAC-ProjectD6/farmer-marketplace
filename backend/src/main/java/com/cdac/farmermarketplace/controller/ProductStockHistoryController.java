package com.cdac.farmermarketplace.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.entity.ProductStockHistory;
import com.cdac.farmermarketplace.service.ProductStockHistoryService;

@RestController
@RequestMapping("/api/product-stock-history")
@CrossOrigin(origins = "*")
public class ProductStockHistoryController {

    private final ProductStockHistoryService productStockHistoryService;

    public ProductStockHistoryController(ProductStockHistoryService productStockHistoryService) {
        this.productStockHistoryService = productStockHistoryService;
    }

    @PostMapping
    public ResponseEntity<ProductStockHistory> saveHistory(
            @RequestBody ProductStockHistory history) {

        return new ResponseEntity<>(
                productStockHistoryService.saveStockHistory(history),
                HttpStatus.CREATED);
    }

    @GetMapping("/product")
    public ResponseEntity<List<ProductStockHistory>> getHistory(
            @RequestBody Product product) {

        return ResponseEntity.ok(
                productStockHistoryService.getStockHistory(product));
    }

}