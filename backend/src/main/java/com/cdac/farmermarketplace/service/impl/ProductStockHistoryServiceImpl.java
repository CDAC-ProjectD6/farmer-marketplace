package com.cdac.farmermarketplace.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.entity.ProductStockHistory;
import com.cdac.farmermarketplace.repository.ProductRepository;
import com.cdac.farmermarketplace.repository.ProductStockHistoryRepository;
import com.cdac.farmermarketplace.service.AuthorizationService;
import com.cdac.farmermarketplace.service.ProductStockHistoryService;

@Service
public class ProductStockHistoryServiceImpl
        implements ProductStockHistoryService {

    private final ProductStockHistoryRepository productStockHistoryRepository;
    private final ProductRepository productRepository;
    private final AuthorizationService authorizationService;

    public ProductStockHistoryServiceImpl(
            ProductStockHistoryRepository productStockHistoryRepository,
            ProductRepository productRepository,
            AuthorizationService authorizationService) {

        this.productStockHistoryRepository = productStockHistoryRepository;
        this.productRepository = productRepository;
        this.authorizationService = authorizationService;
    }

    // ================= SAVE STOCK HISTORY =================

    @Override
    public ProductStockHistory saveStockHistory(
            ProductStockHistory history) {

        if (history.getProduct() == null ||
                history.getProduct().getId() == null) {

            throw new RuntimeException("Product ID is required");
        }

        Long productId = history.getProduct().getId();

        // Load actual product from database
        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));

        // Farmer -> own product only
        // Admin -> any product
        authorizationService.verifyProductOwnership(product);

        // Use actual database product
        history.setProduct(product);

        return productStockHistoryRepository.save(history);
    }

    // ================= GET STOCK HISTORY =================

    // FIX: Changed method name and parameter to match interface
    @Override
    public List<ProductStockHistory> getStockHistoryByProductId(
            Long productId) {

        if (productId == null) {
            throw new IllegalArgumentException("Product ID is required");
        }

        // Load actual product from database using the ID
        Product actualProduct = productRepository
                .findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));

        // Check actual ownership
        authorizationService.verifyProductOwnership(actualProduct);

        // We can still use the existing repository method since we fetched the product
        return productStockHistoryRepository
                .findByProduct(actualProduct);
    }
}