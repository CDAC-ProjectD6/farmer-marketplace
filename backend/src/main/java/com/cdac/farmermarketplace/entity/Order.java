package com.cdac.farmermarketplace.entity;


import com.cdac.farmermarketplace.enums.OrderStatus;
import com.cdac.farmermarketplace.enums.PaymentMethod;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@Table(name="orders")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


@AttributeOverrides({

    @AttributeOverride(
            name="id",
            column=@Column(name="order_id")
    ),

    @AttributeOverride(
            name="createdAt",
            column=@Column(name="order_created_at")
    ),

    @AttributeOverride(
            name="updatedAt",
            column=@Column(name="order_updated_at")
    )

})

public class Order extends BaseEntity {



    @ManyToOne
    @JoinColumn(
            name="user_id",
            nullable=false
    )
    private User user;



    @Column(nullable=false,
            precision=10,
            scale=2)
    private BigDecimal subtotal;



    @Column(nullable=false,
            precision=10,
            scale=2)
    private BigDecimal tax;



    @Column(name="total_amount",
            nullable=false,
            precision=10,
            scale=2)
    private BigDecimal totalAmount;



    @Column(name="shipping_address",
            nullable=false)
    private String shippingAddress;



    @Column(nullable=false,length=6)
    private String pincode;



    @Column(nullable=false,length=10)
    private String mobile;



    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private OrderStatus status;



    @Enumerated(EnumType.STRING)
    @Column(name="payment_method",
            nullable=false)
    private PaymentMethod paymentMethod;



    @Column(name="order_date",
            nullable=false)
    private LocalDateTime orderDate;




    @OneToMany(
            mappedBy="order",
            cascade=CascadeType.ALL,
            orphanRemoval=true
    )
    private List<OrderItem> orderItems = new ArrayList<>();

}