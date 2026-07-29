package com.cdac.farmermarketplace.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cdac.farmermarketplace.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // ================= NORMAL PRODUCT MANAGEMENT =================

    // Find by product name
    Optional<Product> findByName(String name);

    // Get all active products
    List<Product> findByActiveTrue();

    // Search products by name
    List<Product> findByNameContainingIgnoreCase(String keyword);

    // Search products by price range
    List<Product> findByPriceBetween(
            BigDecimal minPrice,
            BigDecimal maxPrice
    );

    // Get products with stock greater than given value
    List<Product> findByStockGreaterThan(Integer stock);

    // Get products by exact stock
    List<Product> findByStock(Integer stock);

    // Get products by category ID
    List<Product> findByCategoryId(Long categoryId);

    // Get products by category name
    List<Product> findByCategory_NameContainingIgnoreCase(
            String categoryName
    );

    // Get products by farmer ID
    List<Product> findByFarmerId(Long farmerId);


    // ================= ADMIN PRODUCT MANAGEMENT =================

    // Search by product name + pagination
    Page<Product> findByNameContainingIgnoreCase(
            String keyword,
            Pageable pageable
    );

    // Filter active/inactive + pagination
    Page<Product> findByActive(
            Boolean active,
            Pageable pageable
    );

    // Search + active/inactive filter + pagination
    Page<Product> findByNameContainingIgnoreCaseAndActive(
            String keyword,
            Boolean active,
            Pageable pageable
    );


    // ================= ADMIN DASHBOARD =================

    // Product count for each category
    @Query("""
           SELECT p.category.name, COUNT(p)
           FROM Product p
           GROUP BY p.category.name
           ORDER BY COUNT(p) DESC
           """)
    List<Object[]> countProductsByCategory();
}