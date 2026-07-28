package com.cdac.farmermarketplace.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.entity.ProductImage;
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

    // ================= CREATE IMAGE =================

    @Override
    public ProductImage saveImage(ProductImage image) {

        if (image.getProduct() == null ||
                image.getProduct().getId() == null) {

            throw new RuntimeException("Product ID is required");
        }

        Long productId = image.getProduct().getId();

        // Load actual product from database
        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));

        // Farmer -> own product only
        // Admin -> any product
        authorizationService.verifyProductOwnership(product);

        // Use actual database product
        image.setProduct(product);

        return productImageRepository.save(image);
    }

    // ================= UPDATE IMAGE =================

    @Override
    public ProductImage updateImage(
            Long id,
            ProductImage image) {

        ProductImage existingImage =
                productImageRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Product Image not found"
                                ));

        // Check ownership of actual existing product
        authorizationService.verifyProductOwnership(
                existingImage.getProduct()
        );

        existingImage.setImageUrl(image.getImageUrl());
        existingImage.setPrimaryImage(
                image.getPrimaryImage()
        );

        return productImageRepository.save(existingImage);
    }

    // ================= GET IMAGE =================

    @Override
    public Optional<ProductImage> getImageById(Long id) {

        return productImageRepository.findById(id);
    }

    // ================= GET ALL IMAGES =================

    @Override
    public List<ProductImage> getAllImages() {

        return productImageRepository.findAll();
    }

    // ================= DELETE IMAGE =================

    @Override
    public void deleteImage(Long id) {

        ProductImage image =
                productImageRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Product Image not found"
                                ));

        // Check ownership before deleting
        authorizationService.verifyProductOwnership(
                image.getProduct()
        );

        productImageRepository.delete(image);
    }

    // ================= GET IMAGES BY PRODUCT =================

    @Override
    public List<ProductImage> getImagesByProduct(
            Product product) {

        return productImageRepository.findByProduct(product);
    }

    // ================= GET PRIMARY IMAGES =================

    @Override
    public List<ProductImage> getPrimaryImages() {

        return productImageRepository.findByPrimaryImageTrue();
    }
}