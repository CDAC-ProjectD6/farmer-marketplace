package com.cdac.farmermarketplace.service;

import java.util.List;

import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.entity.ProductStockHistory;

public interface ProductStockHistoryService {

    ProductStockHistory saveStockHistory(ProductStockHistory history);

    List<ProductStockHistory> getStockHistory(Product product);

}