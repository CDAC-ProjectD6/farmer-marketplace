package com.cdac.farmermarketplace.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cdac.farmermarketplace.entity.ProductImage;
import com.cdac.farmermarketplace.service.ProductImageService;

@RestController
@RequestMapping("/api/product-images")
@CrossOrigin(origins = "*")
public class ProductImageController {

    private final ProductImageService productImageService;

    public ProductImageController(ProductImageService productImageService) {
        this.productImageService = productImageService;
    }

    // Add product image - Farmer or Admin
    @PreAuthorize("hasAnyRole('FARMER', 'ADMIN')")
    @PostMapping
    public ResponseEntity<ProductImage> createImage(
            @RequestBody ProductImage productImage) {

        return new ResponseEntity<>(
                productImageService.saveImage(productImage),
                HttpStatus.CREATED);
    }

    // View all images - Any authenticated user
    @GetMapping
    public ResponseEntity<List<ProductImage>> getAllImages() {

        return ResponseEntity.ok(
                productImageService.getAllImages()
        );
    }

    // View image - Any authenticated user
    @GetMapping("/{id}")
    public ResponseEntity<ProductImage> getImageById(
            @PathVariable Long id) {

        return productImageService.getImageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete image - Farmer or Admin
    @PreAuthorize("hasAnyRole('FARMER', 'ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImage(
            @PathVariable Long id) {

        productImageService.deleteImage(id);

        return ResponseEntity.ok(
                "Product image deleted successfully."
        );
    }
}