package com.cdac.farmermarketplace.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "wishlist")
@Getter
@Setter
@NoArgsConstructor
public class Wishlist extends BaseEntity {


    // Customer who added product
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;


    // Product added to wishlist
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "product_id",
            nullable = false
    )
    private Product product;


    public Wishlist(User user, Product product) {
        this.user = user;
        this.product = product;
    }
}
