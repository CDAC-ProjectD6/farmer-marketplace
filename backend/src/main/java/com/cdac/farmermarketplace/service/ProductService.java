package com.cdac.farmermarketplace.service;

import java.math.BigDecimal;
import java.util.List;

import com.cdac.farmermarketplace.dto.request.ProductRequestDto;
import com.cdac.farmermarketplace.dto.response.ProductResponseDto;

public interface ProductService {

    // Create Product
    ProductResponseDto saveProduct(ProductRequestDto requestDto);

    // Update Product
    ProductResponseDto updateProduct(Long id, ProductRequestDto requestDto);
    ProductResponseDto getProductByName(String name);

List<ProductResponseDto> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice);
List<ProductResponseDto> getProductsByStock(Integer stock);

List<ProductResponseDto> getProductsByCategoryName(String categoryName);

    // Delete Product
    void deleteProduct(Long id);

    // Get Product by ID
    ProductResponseDto getProductById(Long id);

    // Get All Products
    List<ProductResponseDto> getAllProducts();

    // Search Products by Name
    List<ProductResponseDto> searchProducts(String keyword);

    // Get Active Products
    List<ProductResponseDto> getActiveProducts();

    // Get Available Products (stock > 0)
    List<ProductResponseDto> getAvailableProducts();

    // Get Products by Category
    List<ProductResponseDto> getProductsByCategory(Long categoryId);

    // Get Products by Farmer
    List<ProductResponseDto> getProductsByFarmer(Long farmerId);
    

}