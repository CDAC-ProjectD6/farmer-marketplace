package com.cdac.farmermarketplace.service;

import java.util.List;

import com.cdac.farmermarketplace.dto.request.ProductRequestDto;
import com.cdac.farmermarketplace.dto.response.ProductResponseDto;

public interface ProductService {

    ProductResponseDto saveProduct(ProductRequestDto requestDto);

    ProductResponseDto updateProduct(Long id, ProductRequestDto requestDto);

    void deleteProduct(Long id);

    ProductResponseDto getProductById(Long id);

    List<ProductResponseDto> getAllProducts();

    List<ProductResponseDto> searchProducts(String keyword);

    List<ProductResponseDto> getActiveProducts();

    List<ProductResponseDto> getAvailableProducts();
}