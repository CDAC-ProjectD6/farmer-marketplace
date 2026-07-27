package com.cdac.farmermarketplace.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "product_stock_history")
public class ProductStockHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @NotNull(message = "Quantity changed is required")
    @Column(nullable = false)
    private Integer quantityChanged;

    @NotNull(message = "Previous stock is required")
    @Column(nullable = false)
    private Integer previousStock;

    @NotNull(message = "New stock is required")
    @Column(nullable = false)
    private Integer newStock;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StockChangeType changeType;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public ProductStockHistory() {
    }

    public ProductStockHistory(Long id,
                               Product product,
                               Integer quantityChanged,
                               Integer previousStock,
                               Integer newStock,
                               StockChangeType changeType,
                               LocalDateTime createdAt) {

        this.id = id;
        this.product = product;
        this.quantityChanged = quantityChanged;
        this.previousStock = previousStock;
        this.newStock = newStock;
        this.changeType = changeType;
        this.createdAt = createdAt;
    }

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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
}