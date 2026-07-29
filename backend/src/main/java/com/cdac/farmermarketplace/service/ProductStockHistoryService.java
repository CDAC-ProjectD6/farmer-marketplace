package com.cdac.farmermarketplace.service;

import java.util.List;

import com.cdac.farmermarketplace.entity.ProductStockHistory;

public interface ProductStockHistoryService {

    ProductStockHistory saveStockHistory(ProductStockHistory history);

    // FIX: Changed to accept a Long productId instead of the whole Product entity
    List<ProductStockHistory> getStockHistoryByProductId(Long productId);

}