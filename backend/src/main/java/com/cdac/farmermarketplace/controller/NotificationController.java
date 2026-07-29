package com.cdac.farmermarketplace.controller;

import java.util.List;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.cdac.farmermarketplace.dto.response.NotificationResponseDto;
import com.cdac.farmermarketplace.service.NotificationService;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    // ================= CREATE =================

    @PutMapping("/user/{userId}/read-all")
    public ResponseEntity<String> markAllAsRead(
            @PathVariable Long userId) {

        notificationService.markAllAsRead(userId);

        return ResponseEntity.ok(
                "All notifications marked as read"
        );
    }

    // ================= GET ALL =================

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationResponseDto>> getUserNotifications(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                notificationService.getUserNotifications(userId)
        );
    }

    // ================= GET UNREAD =================

    @GetMapping("/user/{userId}/unread")
    public ResponseEntity<List<NotificationResponseDto>> getUnreadNotifications(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                notificationService.getUnreadNotifications(userId)
        );
    }

    // ================= COUNT UNREAD =================

    @GetMapping("/user/{userId}/count")
    public ResponseEntity<Long> getUnreadCount(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                notificationService.getUnreadCount(userId)
        );
    }

    // ================= MARK AS READ =================

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<NotificationResponseDto> markAsRead(
            @PathVariable Long notificationId) {

        return ResponseEntity.ok(
                notificationService.markAsRead(notificationId)
        );
    }

    // ================= DELETE =================

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<String> deleteNotification(
            @PathVariable Long notificationId) {

        notificationService.deleteNotification(notificationId);

        return ResponseEntity.ok(
                "Notification deleted successfully"
        );
    }
}