package com.cdac.farmermarketplace.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.entity.ProductImage;
import com.cdac.farmermarketplace.repository.ProductImageRepository;
import com.cdac.farmermarketplace.service.ProductImageService;

@Service
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductImageRepository productImageRepository;

    public ProductImageServiceImpl(ProductImageRepository productImageRepository) {
        this.productImageRepository = productImageRepository;
    }

    @Override
    public ProductImage saveImage(ProductImage image) {
        return productImageRepository.save(image);
    }

    @Override
    public ProductImage updateImage(Long id, ProductImage image) {

        ProductImage existingImage = productImageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Image not found"));

        existingImage.setImageUrl(image.getImageUrl());
        existingImage.setPrimaryImage(image.getPrimaryImage());

        return productImageRepository.save(existingImage);
    }

    @Override
    public Optional<ProductImage> getImageById(Long id) {
        return productImageRepository.findById(id);
    }

    @Override
    public List<ProductImage> getAllImages() {
        return productImageRepository.findAll();
    }

    @Override
    public void deleteImage(Long id) {
        productImageRepository.deleteById(id);
    }

    @Override
    public List<ProductImage> getImagesByProduct(Product product) {
        return productImageRepository.findByProduct(product);
    }

    @Override
    public List<ProductImage> getPrimaryImages() {
        return productImageRepository.findByPrimaryImageTrue();
    }

}