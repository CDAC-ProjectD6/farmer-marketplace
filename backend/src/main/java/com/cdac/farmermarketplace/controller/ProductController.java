	package com.cdac.farmermarketplace.controller;
	
	import java.math.BigDecimal;
	import java.util.List;
	
	import org.springframework.http.HttpStatus;
	import org.springframework.http.ResponseEntity;
	import org.springframework.security.access.prepost.PreAuthorize;
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
	
	    // ================= CREATE PRODUCT =================
	    // Only Farmer creates a product
	    @PreAuthorize("hasRole('FARMER')")
	    @PostMapping
	    public ResponseEntity<ProductResponseDto> createProduct(
	            @Valid @RequestBody ProductRequestDto productRequestDto) {
	
	        ProductResponseDto savedProduct =
	                productService.saveProduct(productRequestDto);
	
	        return new ResponseEntity<>(
	                savedProduct,
	                HttpStatus.CREATED
	        );
	    }
	
	    // ================= GET ALL PRODUCTS =================
	    // Any authenticated user can view products
	    @GetMapping
	    public ResponseEntity<List<ProductResponseDto>> getAllProducts() {
	
	        return ResponseEntity.ok(
	                productService.getAllProducts()
	        );
	    }
	
	    // ================= GET PRODUCT BY ID =================
	    // Any authenticated user can view a product
	    @GetMapping("/{id}")
	    public ResponseEntity<ProductResponseDto> getProductById(
	            @PathVariable Long id) {
	
	        return ResponseEntity.ok(
	                productService.getProductById(id)
	        );
	    }
	
	    // ================= UPDATE PRODUCT =================
	    // Farmer can update own product.
	    // Admin can update any product.
	    // Ownership check will be added separately.
	    @PreAuthorize("hasAnyRole('FARMER', 'ADMIN')")
	    @PutMapping("/{id}")
	    public ResponseEntity<ProductResponseDto> updateProduct(
	            @PathVariable Long id,
	            @Valid @RequestBody ProductRequestDto productRequestDto) {
	
	        ProductResponseDto updatedProduct =
	                productService.updateProduct(
	                        id,
	                        productRequestDto
	                );
	
	        return ResponseEntity.ok(updatedProduct);
	    }
	
	    // ================= DELETE PRODUCT =================
	    // Farmer can delete own product.
	    // Admin can delete any product.
	    // Ownership check will be added separately.
	    @PreAuthorize("hasAnyRole('FARMER', 'ADMIN')")
	    @DeleteMapping("/{id}")
	    public ResponseEntity<String> deleteProduct(
	            @PathVariable Long id) {
	
	        productService.deleteProduct(id);
	
	        return ResponseEntity.ok(
	                "Product deleted successfully."
	        );
	    }
	
	    // ================= ACTIVE PRODUCTS =================
	    // Any authentic
	    // ated user can view
	    @GetMapping("/active")
	    public ResponseEntity<List<ProductResponseDto>> getActiveProducts() {
	
	        return ResponseEntity.ok(
	                productService.getActiveProducts()
	        );
	    }
	
	    // ================= AVAILABLE PRODUCTS =================
	    // Any authenticated user can view
	    @GetMapping("/available")
	    public ResponseEntity<List<ProductResponseDto>> getAvailableProducts() {
	
	        return ResponseEntity.ok(
	                productService.getAvailableProducts()
	        );
	    }
	   @GetMapping("/search")
	public ResponseEntity<List<ProductResponseDto>> searchProducts(
	        @RequestParam("keyword") String keyword) {
	    return ResponseEntity.ok(productService.searchProducts(keyword));
	}
	
	@GetMapping("/name/{name}")
	public ResponseEntity<ProductResponseDto> getProductByName(
	        @PathVariable String name) {
	
	    return ResponseEntity.ok(productService.getProductByName(name));
	}
	@GetMapping("/category/{categoryId}")
	public ResponseEntity<List<ProductResponseDto>> getProductsByCategory(
	        @PathVariable Long categoryId) {
	
	    return ResponseEntity.ok(productService.getProductsByCategory(categoryId));
	}
	@GetMapping("/category/name/{categoryName}")
	public ResponseEntity<List<ProductResponseDto>> getProductsByCategoryName(
	        @PathVariable String categoryName) {
	
	    return ResponseEntity.ok(
	            productService.getProductsByCategoryName(categoryName));
	}
	@GetMapping("/farmer/{farmerId}")
	public ResponseEntity<List<ProductResponseDto>> getProductsByFarmer(
	        @PathVariable Long farmerId) {
	
	    return ResponseEntity.ok(productService.getProductsByFarmer(farmerId));
	}
	@GetMapping("/price")
	public ResponseEntity<List<ProductResponseDto>> getProductsByPriceRange(
	        @RequestParam("minPrice") BigDecimal minPrice,
	        @RequestParam("maxPrice") BigDecimal maxPrice) {
	    return ResponseEntity.ok(productService.getProductsByPriceRange(minPrice, maxPrice));
	}
	
	@GetMapping("/stock/{stock}")
	public ResponseEntity<List<ProductResponseDto>> getProductsByStock(
	        @PathVariable Integer stock) {
	
	    return ResponseEntity.ok(productService.getProductsByStock(stock));
	}
	
	}