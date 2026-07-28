package com.cdac.farmermarketplace.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.entity.ProductStockHistory;

public interface ProductStockHistoryRepository
        extends JpaRepository<ProductStockHistory, Long> {

    List<ProductStockHistory> findByProduct(Product product);

}