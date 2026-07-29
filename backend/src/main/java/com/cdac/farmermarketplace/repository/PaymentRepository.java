package com.cdac.farmermarketplace.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.farmermarketplace.entity.Payment;



public interface PaymentRepository extends JpaRepository<Payment, Long>{


}
