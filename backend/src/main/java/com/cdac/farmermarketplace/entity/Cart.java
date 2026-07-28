package com.cdac.farmermarketplace.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "cart")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@AttributeOverrides({

    @AttributeOverride(
        name = "id",
        column = @Column(name = "cart_id")
    ),

    @AttributeOverride(
        name = "createdAt",
        column = @Column(name = "cart_created_at")
    ),

    @AttributeOverride(
        name = "updatedAt",
        column = @Column(name = "cart_updated_at")
    )
})
public class Cart extends BaseEntity {


    @OneToOne
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true
    )
    private User user;



    @OneToMany(
            mappedBy = "cart",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<CartItem> cartItems = new ArrayList<>();

}