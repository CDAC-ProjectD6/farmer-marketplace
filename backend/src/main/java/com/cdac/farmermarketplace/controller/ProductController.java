package com.cdac.farmermarketplace.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.farmermarketplace.dto.request.ProductRequestDto;
import com.cdac.farmermarketplace.dto.response.ProductResponseDto;
import com.cdac.farmermarketplace.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Create Product
    @PostMapping
    public ResponseEntity<ProductResponseDto> createProduct(
            @Valid @RequestBody ProductRequestDto productRequestDto) {

        ProductResponseDto savedProduct =
                productService.saveProduct(productRequestDto);

        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    // Get All Products
    @GetMapping
    public ResponseEntity<List<ProductResponseDto>> getAllProducts() {

        return ResponseEntity.ok(productService.getAllProducts());
    }

    // Get Product By Id
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDto> getProductById(
            @PathVariable Long id) {

        return ResponseEntity.ok(productService.getProductById(id));
    }

    // Update Product
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDto> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequestDto productRequestDto) {

        ProductResponseDto updatedProduct =
                productService.updateProduct(id, productRequestDto);

        return ResponseEntity.ok(updatedProduct);
    }

    // Delete Product
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {

        productService.deleteProduct(id);

        return ResponseEntity.ok("Product deleted successfully.");
    }

    // Search Products
    @GetMapping("/search")
    public ResponseEntity<List<ProductResponseDto>> searchProducts(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                productService.searchProducts(keyword));
    }

    // Active Products
    @GetMapping("/active")
    public ResponseEntity<List<ProductResponseDto>> getActiveProducts() {

        return ResponseEntity.ok(
                productService.getActiveProducts());
    }

    // Available Products
    @GetMapping("/available")
    public ResponseEntity<List<ProductResponseDto>> getAvailableProducts() {

        return ResponseEntity.ok(
                productService.getAvailableProducts());
    }
}