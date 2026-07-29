package com.cdac.farmermarketplace.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.farmermarketplace.entity.Notification;
import com.cdac.farmermarketplace.entity.User;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Get all notifications of a user
    List<Notification> findByUserOrderByCreatedAtDesc(User user);

    // Get unread notifications
    List<Notification> findByUserAndReadFalseOrderByCreatedAtDesc(User user);

    // Count unread notifications
    long countByUserAndReadFalse(User user);
}