package com.cdac.farmermarketplace.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.entity.Review;
import com.cdac.farmermarketplace.entity.User;


@Repository
public interface ReviewRepository 
        extends JpaRepository<Review, Long> {


    List<Review> findByProduct(Product product);



    boolean existsByUserAndProduct(
            User user,
            Product product
    );



    void deleteByUserAndProduct(
            User user,
            Product product
    );



    // ================= RATING SUMMARY =================


    @Query("""
            SELECT AVG(r.rating)
            FROM Review r
            WHERE r.product.id = :productId
           """)
    Double findAverageRating(Long productId);



    @Query("""
            SELECT COUNT(r)
            FROM Review r
            WHERE r.product.id = :productId
           """)
    Long countReviews(Long productId);


}