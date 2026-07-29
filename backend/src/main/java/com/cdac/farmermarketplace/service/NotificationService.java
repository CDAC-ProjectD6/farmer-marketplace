package com.cdac.farmermarketplace.service;

import java.util.List;

import com.cdac.farmermarketplace.dto.response.NotificationResponseDto;
import com.cdac.farmermarketplace.entity.User;

public interface NotificationService {

    // Automatic notification creation
    void createNotification(
            User user,
            String title,
            String message
    );

    List<NotificationResponseDto> getUserNotifications(Long userId);

    List<NotificationResponseDto> getUnreadNotifications(Long userId);

    Long getUnreadCount(Long userId);

    NotificationResponseDto markAsRead(Long notificationId);

    void deleteNotification(Long notificationId);
    void markAllAsRead(Long userId);
}