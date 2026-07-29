package com.cdac.farmermarketplace.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDto {


    private Long id;


    private String name;


    private String description;


    private BigDecimal price;


    private Integer stock;


    private String brand;


    private String imageUrl;


    private Boolean active;



    // Category Details

    private Long categoryId;


    private String categoryName;



    // Farmer Details

    private Long farmerId;


    private String farmerName;



    private LocalDateTime createdAt;


    private LocalDateTime updatedAt;



    // ============================
    // REVIEW & RATING DETAILS
    // ============================

    private Double averageRating;


    private Long reviewCount;


}