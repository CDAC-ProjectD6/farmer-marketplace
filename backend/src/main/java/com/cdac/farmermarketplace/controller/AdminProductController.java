package com.cdac.farmermarketplace.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.farmermarketplace.dto.response.ProductResponseDto;
import com.cdac.farmermarketplace.service.AdminProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminProductController {

    private final AdminProductService adminProductService;

    // ================= GET PRODUCTS =================
    // Pagination + Search + Active/Inactive Filter

    @GetMapping
    public ResponseEntity<Page<ProductResponseDto>> getProducts(

            @RequestParam(required = false)
            String keyword,

            @RequestParam(required = false)
            Boolean active,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size) {

        return ResponseEntity.ok(
                adminProductService.getProducts(
                        keyword,
                        active,
                        page,
                        size
                )
        );
    }

    // ================= GET PRODUCT BY ID =================

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDto> getProductById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                adminProductService.getProductById(id)
        );
    }

    // ================= DEACTIVATE PRODUCT =================

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<ProductResponseDto> deactivateProduct(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                adminProductService.deactivateProduct(id)
        );
    }

    // ================= ACTIVATE PRODUCT =================

    @PatchMapping("/{id}/activate")
    public ResponseEntity<ProductResponseDto> activateProduct(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                adminProductService.activateProduct(id)
        );
    }
}