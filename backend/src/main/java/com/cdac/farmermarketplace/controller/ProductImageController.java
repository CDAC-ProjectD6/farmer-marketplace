package com.cdac.farmermarketplace.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cdac.farmermarketplace.dto.request.ProductImageRequestDto;
import com.cdac.farmermarketplace.dto.response.ProductImageResponseDto;
import com.cdac.farmermarketplace.service.ProductImageService;

import jakarta.validation.Valid;

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
    public ResponseEntity<ProductImageResponseDto> createImage(
            @Valid @RequestBody ProductImageRequestDto requestDto) {

        return new ResponseEntity<>(
                productImageService.saveImage(requestDto),
                HttpStatus.CREATED);
    }

    // View all images - Any authenticated user
    @GetMapping
    public ResponseEntity<List<ProductImageResponseDto>> getAllImages() {

        return ResponseEntity.ok(
                productImageService.getAllImages()
        );
    }

    // View image - Any authenticated user
    @GetMapping("/{id}")
    public ResponseEntity<ProductImageResponseDto> getImageById(
            @PathVariable Long id) {

        // Assuming the service throws ResourceNotFoundException if not found, 
        // which will be caught by your GlobalExceptionHandler.
        return ResponseEntity.ok(productImageService.getImageById(id));
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