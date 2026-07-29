package com.cdac.farmermarketplace.entity;


import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.cdac.farmermarketplace.enums.PaymentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;


import lombok.Getter;
import lombok.Setter;



@Entity
@Getter
@Setter
@Table(name="payments")

public class Payment {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @Column(name="razorpay_order_id")
    private String razorpayOrderId;



    @Column(name="razorpay_payment_id")
    private String razorpayPaymentId;



    @Column(name="razorpay_signature")
    private String razorpaySignature;



    @Column(nullable=false,
            precision=10,
            scale=2)
    private BigDecimal amount;



    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private PaymentStatus status;



    private LocalDateTime createdAt = LocalDateTime.now();



    @OneToOne
    @JoinColumn(
            name="order_id",
            nullable=false
    )
    private Order order;


}