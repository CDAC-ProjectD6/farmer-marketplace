package com.cdac.farmermarketplace.repository;


import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;


import com.cdac.farmermarketplace.entity.Order;
import com.cdac.farmermarketplace.entity.User;



public interface OrderRepository extends JpaRepository<Order, Long> {


    List<Order> findByUser(User user);


}