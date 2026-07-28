package com.cdac.farmermarketplace.dto.response;

import java.time.LocalDateTime;

public class ProductImageResponseDto {

    private Long id;

    private String imageUrl;

    private Boolean primaryImage;

    private LocalDateTime createdAt;

    public ProductImageResponseDto() {
    }

    public ProductImageResponseDto(Long id, String imageUrl, Boolean primaryImage, LocalDateTime createdAt) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.primaryImage = primaryImage;
        this.createdAt = createdAt;
    }

    // =========================
    // Getters and Setters
    // =========================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getPrimaryImage() {
        return primaryImage;
    }

    public void setPrimaryImage(Boolean primaryImage) {
        this.primaryImage = primaryImage;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}