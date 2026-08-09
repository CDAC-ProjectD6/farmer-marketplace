package com.cdac.farmermarketplace.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

//import com.cdac.farmermarketplace.dto.request.NotificationRequestDto;
import com.cdac.farmermarketplace.dto.response.NotificationResponseDto;
import com.cdac.farmermarketplace.entity.Notification;
import com.cdac.farmermarketplace.entity.NotificationStatus;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.repository.NotificationRepository;
import com.cdac.farmermarketplace.repository.UserRepository;
import com.cdac.farmermarketplace.service.NotificationService;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationServiceImpl(
            NotificationRepository notificationRepository,
            UserRepository userRepository) {

        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    // ================= CREATE NOTIFICATION =================

    @Override
    public void createNotification(
            User user,
            String title,
            String message,
            NotificationStatus status) {

        Notification notification = new Notification();

        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setStatus(status);
        notification.setRead(false);

        notificationRepository.save(notification);
    }

    // ================= GET ALL =================

    @Override
    public List<NotificationResponseDto> getUserNotifications(
            Long userId) {

        User user = findUser(userId);

        return notificationRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    // ================= GET UNREAD =================

    @Override
    public List<NotificationResponseDto> getUnreadNotifications(
            Long userId) {

        User user = findUser(userId);

        return notificationRepository
                .findByUserAndReadFalseOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    // ================= MARK AS READ =================

    @Override
    public NotificationResponseDto markAsRead(
            Long notificationId) {

        Notification notification =
                findNotification(notificationId);

        notification.setRead(true);

        Notification updated =
                notificationRepository.save(notification);

        return mapToDto(updated);
    }
    
    @Override
    public void markAllAsRead(Long userId) {

        User user = findUser(userId);

        List<Notification> notifications =
                notificationRepository
                        .findByUserAndReadFalseOrderByCreatedAtDesc(user);

        notifications.forEach(notification ->
                notification.setRead(true));

        notificationRepository.saveAll(notifications);
    }

    // ================= COUNT UNREAD =================

    @Override
    public Long getUnreadCount(Long userId) {

        User user = findUser(userId);

        return notificationRepository
                .countByUserAndReadFalse(user);
    }

    // ================= DELETE =================

    @Override
    public void deleteNotification(Long notificationId) {

        Notification notification =
                findNotification(notificationId);

        notificationRepository.delete(notification);
    }

    // ================= HELPER METHODS =================

    private User findUser(Long userId) {

        return userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with id: " + userId));
    }

    private Notification findNotification(Long id) {

        return notificationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Notification not found with id: " + id));
    }

    private NotificationResponseDto mapToDto(
            Notification notification) {

        return new NotificationResponseDto(
        		 notification.getId(),
                 notification.getTitle(),
                 notification.getMessage(),
                 notification.isRead(),
                 notification.getCreatedAt(),
                 notification.getStatus()
        );
    }
}