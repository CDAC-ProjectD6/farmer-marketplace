package com.cdac.farmermarketplace.dto.response;

import java.time.LocalDateTime;

import com.cdac.farmermarketplace.entity.StockChangeType;

public class ProductStockHistoryResponseDto {

    private Long id;

    private Integer quantityChanged;

    private Integer previousStock;

    private Integer newStock;

    private StockChangeType changeType;

    private LocalDateTime createdAt;

    public ProductStockHistoryResponseDto() {
    }

    public ProductStockHistoryResponseDto(Long id,
                                          Integer quantityChanged,
                                          Integer previousStock,
                                          Integer newStock,
                                          StockChangeType changeType,
                                          LocalDateTime createdAt) {

        this.id = id;
        this.quantityChanged = quantityChanged;
        this.previousStock = previousStock;
        this.newStock = newStock;
        this.changeType = changeType;
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

    public Integer getQuantityChanged() {
        return quantityChanged;
    }

    public void setQuantityChanged(Integer quantityChanged) {
        this.quantityChanged = quantityChanged;
    }

    public Integer getPreviousStock() {
        return previousStock;
    }

    public void setPreviousStock(Integer previousStock) {
        this.previousStock = previousStock;
    }

    public Integer getNewStock() {
        return newStock;
    }

    public void setNewStock(Integer newStock) {
        this.newStock = newStock;
    }

    public StockChangeType getChangeType() {
        return changeType;
    }

    public void setChangeType(StockChangeType changeType) {
        this.changeType = changeType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}