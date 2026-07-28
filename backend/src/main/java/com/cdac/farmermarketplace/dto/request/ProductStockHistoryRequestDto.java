package com.cdac.farmermarketplace.dto.request;

import com.cdac.farmermarketplace.entity.StockChangeType;

import jakarta.validation.constraints.NotNull;

public class ProductStockHistoryRequestDto {

    @NotNull
    private Long productId;

    @NotNull
    private Integer quantityChanged;

    @NotNull
    private Integer previousStock;

    @NotNull
    private Integer newStock;

    @NotNull
    private StockChangeType changeType;

    public ProductStockHistoryRequestDto() {
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
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
}