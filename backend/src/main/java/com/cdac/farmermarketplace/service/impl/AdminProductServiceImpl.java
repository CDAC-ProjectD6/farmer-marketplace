package com.cdac.farmermarketplace.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.dto.response.ProductResponseDto;
import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.exception.ResourceNotFoundException;
import com.cdac.farmermarketplace.repository.ProductRepository;
import com.cdac.farmermarketplace.service.AdminProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminProductServiceImpl implements AdminProductService {

    private final ProductRepository productRepository;

    // ================= GET PRODUCTS =================
    // Supports:
    // 1. All products
    // 2. Search by product name
    // 3. Filter active/inactive
    // 4. Search + active/inactive
    // 5. Pagination

    @Override
    public Page<ProductResponseDto> getProducts(
            String keyword,
            Boolean active,
            int page,
            int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<Product> products;

        boolean hasKeyword =
                keyword != null && !keyword.trim().isEmpty();

        // Search + Active/Inactive filter
        if (hasKeyword && active != null) {

            products =
                    productRepository
                            .findByNameContainingIgnoreCaseAndActive(
                                    keyword.trim(),
                                    active,
                                    pageable
                            );
        }

        // Search only
        else if (hasKeyword) {

            products =
                    productRepository
                            .findByNameContainingIgnoreCase(
                                    keyword.trim(),
                                    pageable
                            );
        }

        // Active/Inactive filter only
        else if (active != null) {

            products =
                    productRepository.findByActive(
                            active,
                            pageable
                    );
        }

        // All products
        else {

            products =
                    productRepository.findAll(pageable);
        }

        return products.map(this::convertToResponse);
    }

    // ================= GET PRODUCT BY ID =================

    @Override
    public ProductResponseDto getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id: " + id
                        ));

        return convertToResponse(product);
    }

    // ================= DEACTIVATE PRODUCT =================

    @Override
    public ProductResponseDto deactivateProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id: " + id
                        ));

        product.setActive(false);

        Product updatedProduct =
                productRepository.save(product);

        return convertToResponse(updatedProduct);
    }

    // ================= ACTIVATE PRODUCT =================

    @Override
    public ProductResponseDto activateProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id: " + id
                        ));

        product.setActive(true);

        Product updatedProduct =
                productRepository.save(product);

        return convertToResponse(updatedProduct);
    }

    // ================= ENTITY -> DTO =================

    private ProductResponseDto convertToResponse(
            Product product) {

        ProductResponseDto dto =
                new ProductResponseDto();

        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setBrand(product.getBrand());
        dto.setImageUrl(product.getImageUrl());
        dto.setActive(product.getActive());

        // Category
        if (product.getCategory() != null) {

            dto.setCategoryId(
                    product.getCategory().getId()
            );

            dto.setCategoryName(
                    product.getCategory().getName()
            );
        }

        // Farmer
        if (product.getFarmer() != null) {

            dto.setFarmerId(
                    product.getFarmer().getId()
            );

            dto.setFarmerName(
                    product.getFarmer().getName()
            );
        }

        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());

        return dto;
    }
}