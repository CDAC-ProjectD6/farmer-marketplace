package com.cdac.farmermarketplace.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.dto.request.ProductImageRequestDto;
import com.cdac.farmermarketplace.dto.response.ProductImageResponseDto;
import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.entity.ProductImage;
import com.cdac.farmermarketplace.exception.ResourceNotFoundException;
import com.cdac.farmermarketplace.repository.ProductImageRepository;
import com.cdac.farmermarketplace.repository.ProductRepository;
import com.cdac.farmermarketplace.service.AuthorizationService;
import com.cdac.farmermarketplace.service.ProductImageService;

@Service
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;
    private final AuthorizationService authorizationService;

    public ProductImageServiceImpl(
            ProductImageRepository productImageRepository,
            ProductRepository productRepository,
            AuthorizationService authorizationService) {
        
        this.productImageRepository = productImageRepository;
        this.productRepository = productRepository;
        this.authorizationService = authorizationService;
    }

    // ================== SAVE IMAGE ==================
    @Override
    public ProductImageResponseDto saveImage(ProductImageRequestDto requestDto) {
        
        Product product = productRepository.findById(requestDto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + requestDto.getProductId()));

        // Ensure the logged-in user owns this product
        authorizationService.verifyProductOwnership(product);

        ProductImage image = new ProductImage();
        image.setProduct(product);
        image.setImageUrl(requestDto.getImageUrl());
        image.setPrimaryImage(requestDto.getPrimaryImage());

        ProductImage savedImage = productImageRepository.save(image);
        return mapToResponseDto(savedImage);
    }

    // ================== UPDATE IMAGE ==================
    @Override
    public ProductImageResponseDto updateImage(Long id, ProductImageRequestDto requestDto) {
        
        ProductImage existingImage = productImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product Image not found"));

        // Check ownership of the product this image belongs to
        authorizationService.verifyProductOwnership(existingImage.getProduct());

        existingImage.setImageUrl(requestDto.getImageUrl());
        existingImage.setPrimaryImage(requestDto.getPrimaryImage());
        
        // If they want to move it to a different product (rare, but supported by DTO)
        if (!existingImage.getProduct().getId().equals(requestDto.getProductId())) {
            Product newProduct = productRepository.findById(requestDto.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("New Product not found"));
            authorizationService.verifyProductOwnership(newProduct);
            existingImage.setProduct(newProduct);
        }

        ProductImage updatedImage = productImageRepository.save(existingImage);
        return mapToResponseDto(updatedImage);
    }

    // ================== GET BY ID ==================
    @Override
    public ProductImageResponseDto getImageById(Long id) {
        ProductImage image = productImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product Image not found"));
        return mapToResponseDto(image);
    }

    // ================== GET ALL IMAGES ==================
    @Override
    public List<ProductImageResponseDto> getAllImages() {
        return productImageRepository.findAll().stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    // ================== DELETE IMAGE ==================
    @Override
    public void deleteImage(Long id) {
        ProductImage image = productImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product Image not found"));

        // Ensure the logged-in user owns this product before deleting the image
        authorizationService.verifyProductOwnership(image.getProduct());

        productImageRepository.delete(image);
    }

    // ================== GET BY PRODUCT ID ==================
    @Override
    public List<ProductImageResponseDto> getImagesByProductId(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        return productImageRepository.findByProduct(product).stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    // ================== GET PRIMARY IMAGES ==================
    @Override
    public List<ProductImageResponseDto> getPrimaryImages() {
        return productImageRepository.findByPrimaryImageTrue().stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    // ================== HELPER MAPPING METHOD ==================
    private ProductImageResponseDto mapToResponseDto(ProductImage image) {
        ProductImageResponseDto dto = new ProductImageResponseDto();
        dto.setId(image.getId());
        dto.setImageUrl(image.getImageUrl());
        dto.setPrimaryImage(image.getPrimaryImage());
        dto.setCreatedAt(image.getCreatedAt());
        return dto;
    }
}