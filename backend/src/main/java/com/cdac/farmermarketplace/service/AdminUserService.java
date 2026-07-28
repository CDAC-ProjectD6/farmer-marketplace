package com.cdac.farmermarketplace.service;

import java.util.List;

import com.cdac.farmermarketplace.dto.response.AdminUserResponseDto;
import com.cdac.farmermarketplace.entity.Role;

public interface AdminUserService {

    // Get all users / search / filter
    List<AdminUserResponseDto> getUsers(
            String search,
            Role role
    );

    // Get single user
    AdminUserResponseDto getUserById(Long id);

    // Block user
    AdminUserResponseDto blockUser(Long id);

    // Unblock user
    AdminUserResponseDto unblockUser(Long id);
}