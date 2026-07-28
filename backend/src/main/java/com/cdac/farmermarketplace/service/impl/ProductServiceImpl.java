package com.cdac.farmermarketplace.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.dto.request.ProductRequestDto;
import com.cdac.farmermarketplace.dto.response.ProductResponseDto;
import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.exception.ResourceNotFoundException;
import com.cdac.farmermarketplace.repository.ProductRepository;
import com.cdac.farmermarketplace.repository.UserRepository;
import com.cdac.farmermarketplace.service.AuthorizationService;
import com.cdac.farmermarketplace.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final AuthorizationService authorizationService;

    public ProductServiceImpl(
            ProductRepository productRepository,
            UserRepository userRepository,
            AuthorizationService authorizationService) {

        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.authorizationService = authorizationService;
    }

    // ================= CREATE PRODUCT =================

    @Override
    public ProductResponseDto saveProduct(ProductRequestDto requestDto) {

        Product product = new Product();

        product.setName(requestDto.getName());
        product.setDescription(requestDto.getDescription());
        product.setPrice(requestDto.getPrice());
        product.setStock(requestDto.getStock());
        product.setBrand(requestDto.getBrand());
        product.setImageUrl(requestDto.getImageUrl());

        product.setActive(
                requestDto.getActive() != null
                        ? requestDto.getActive()
                        : true
        );

        // Get currently logged-in Farmer
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Logged-in user not found"));

        // Automatically assign ownership
        product.setFarmer(farmer);

        Product savedProduct =
                productRepository.save(product);

        return convertToResponse(savedProduct);
    }

    // ================= UPDATE PRODUCT =================

    @Override
    public ProductResponseDto updateProduct(
            Long id,
            ProductRequestDto requestDto) {

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        // SECURITY CHECK FIRST
        authorizationService.verifyProductOwnership(existingProduct);

        // Only modify after authorization succeeds
        existingProduct.setName(requestDto.getName());
        existingProduct.setDescription(requestDto.getDescription());
        existingProduct.setPrice(requestDto.getPrice());
        existingProduct.setStock(requestDto.getStock());
        existingProduct.setBrand(requestDto.getBrand());
        existingProduct.setImageUrl(requestDto.getImageUrl());
        existingProduct.setActive(requestDto.getActive());

        Product updatedProduct =
                productRepository.save(existingProduct);

        return convertToResponse(updatedProduct);
    }

    // ================= DELETE PRODUCT =================

    @Override
    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        // SECURITY CHECK FIRST
        authorizationService.verifyProductOwnership(product);

        productRepository.delete(product);
    }

    // ================= GET PRODUCT =================

    @Override
    public ProductResponseDto getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        return convertToResponse(product);
    }

    // ================= GET ALL PRODUCTS =================

    @Override
    public List<ProductResponseDto> getAllProducts() {

        List<Product> products = productRepository.findAll();
        List<ProductResponseDto> responseList = new ArrayList<>();

        for (Product product : products) {
            responseList.add(convertToResponse(product));
        }

        return responseList;
    }

    // ================= SEARCH PRODUCTS =================

    @Override
    public List<ProductResponseDto> searchProducts(String keyword) {

        List<Product> products =
                productRepository.findByNameContainingIgnoreCase(keyword);

        List<ProductResponseDto> responseList = new ArrayList<>();

        for (Product product : products) {
            responseList.add(convertToResponse(product));
        }

        return responseList;
    }

    // ================= ACTIVE PRODUCTS =================

    @Override
    public List<ProductResponseDto> getActiveProducts() {

        List<Product> products =
                productRepository.findByActiveTrue();

        List<ProductResponseDto> responseList = new ArrayList<>();

        for (Product product : products) {
            responseList.add(convertToResponse(product));
        }

        return responseList;
    }

    // ================= AVAILABLE PRODUCTS =================

    @Override
    public List<ProductResponseDto> getAvailableProducts() {

        List<Product> products =
                productRepository.findByStockGreaterThan(0);

        List<ProductResponseDto> responseList = new ArrayList<>();

        for (Product product : products) {
            responseList.add(convertToResponse(product));
        }

        return responseList;
    }

    // ================= ENTITY -> DTO =================

    private ProductResponseDto convertToResponse(Product product) {

        ProductResponseDto dto = new ProductResponseDto();

        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setBrand(product.getBrand());
        dto.setImageUrl(product.getImageUrl());
        dto.setActive(product.getActive());

        // Uncomment after Category entity is ready
        // dto.setCategoryId(product.getCategory().getId());
        // dto.setCategoryName(product.getCategory().getName());

        // Can enable if ProductResponseDto contains these fields
        // dto.setFarmerId(product.getFarmer().getId());
        // dto.setFarmerName(product.getFarmer().getName());

        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());

        return dto;
    }
}