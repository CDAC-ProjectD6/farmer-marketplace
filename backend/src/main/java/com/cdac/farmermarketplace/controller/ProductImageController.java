package com.cdac.farmermarketplace.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping
    public ResponseEntity<ProductImage> createImage(
            @RequestBody ProductImage productImage) {

        return new ResponseEntity<>(
                productImageService.saveImage(productImage),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProductImage>> getAllImages() {

        return ResponseEntity.ok(productImageService.getAllImages());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductImage> getImageById(@PathVariable Long id) {

        return productImageService.getImageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable Long id) {

        productImageService.deleteImage(id);

        return ResponseEntity.ok("Product image deleted successfully.");
    }

}