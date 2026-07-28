package com.cdac.farmermarketplace.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.entity.ProductStockHistory;
import com.cdac.farmermarketplace.repository.ProductStockHistoryRepository;
import com.cdac.farmermarketplace.service.ProductStockHistoryService;

@Service
public class ProductStockHistoryServiceImpl implements ProductStockHistoryService {

    private final ProductStockHistoryRepository productStockHistoryRepository;

    public ProductStockHistoryServiceImpl(ProductStockHistoryRepository productStockHistoryRepository) {
        this.productStockHistoryRepository = productStockHistoryRepository;
    }

    @Override
    public ProductStockHistory saveStockHistory(ProductStockHistory history) {
        return productStockHistoryRepository.save(history);
    }

    @Override
    public List<ProductStockHistory> getStockHistory(Product product) {
        return productStockHistoryRepository.findByProduct(product);
    }
}