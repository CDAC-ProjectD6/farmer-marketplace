package com.cdac.farmermarketplace.entity;



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

@Entity
@Table(name = "cart")
@AttributeOverrides({
    @AttributeOverride(
        name = "createdAt",
        column = @Column(name = "cart_created_at")
    ),
    @AttributeOverride(
        name = "updatedAt",
        column = @Column(name = "cart_updated_at")
    )
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cart extends BaseEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cartId;
	private Long userId;
	
}
