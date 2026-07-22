package com.cdac.farmermarketplace.entity;

import java.math.BigDecimal;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cart_items")
public class CartItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cartItemId;
	@Column(name = "cart_id" , nullable=false)
	private Long cartId;
	@Column(name = "product_id" , nullable=false)
	private Long productId;
	@Column(name = "quantity", nullable = false)
	private Integer quantity;
	@Column(name = "price" , nullable = false, precision = 10, scale = 2)
	private BigDecimal price;
	@Column(name = "sub_total" , nullable = false , precision = 10, scale = 2)
	private BigDecimal subtotal;
}
