package com.cdac.farmermarketplace.service;

import org.springframework.data.domain.Page;

import com.cdac.farmermarketplace.dto.response.ProductResponseDto;

public interface AdminProductService {

    // Get products with search, filter and pagination
    Page<ProductResponseDto> getProducts(
            String keyword,
            Boolean active,
            int page,
            int size
    );

    // Get product details
    ProductResponseDto getProductById(Long id);

    // Deactivate product
    ProductResponseDto deactivateProduct(Long id);

    // Activate product
    ProductResponseDto activateProduct(Long id);
}