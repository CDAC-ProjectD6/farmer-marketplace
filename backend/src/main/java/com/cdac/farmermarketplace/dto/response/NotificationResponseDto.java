package com.cdac.farmermarketplace.dto.response;

import java.time.LocalDateTime;

import com.cdac.farmermarketplace.entity.NotificationStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponseDto {

    private Long id;

    private String title;

    private String message;

    private boolean read;

    private LocalDateTime createdAt;
    
    private NotificationStatus status;
}