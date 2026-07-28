package com.cdac.farmermarketplace.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.dto.response.AdminUserResponseDto;
import com.cdac.farmermarketplace.entity.Role;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.repository.UserRepository;
import com.cdac.farmermarketplace.service.AdminUserService;

@Service
public class AdminUserServiceImpl implements AdminUserService {

    private final UserRepository userRepository;

    public AdminUserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ================= GET USERS =================

    @Override
    public List<AdminUserResponseDto> getUsers(
            String search,
            Role role) {

        List<User> users;

        boolean hasSearch =
                search != null && !search.trim().isEmpty();

        if (hasSearch && role != null) {

            users =
                    userRepository
                            .findByRoleAndNameContainingIgnoreCaseOrRoleAndEmailContainingIgnoreCase(
                                    role,
                                    search.trim(),
                                    role,
                                    search.trim()
                            );

        } else if (hasSearch) {

            users =
                    userRepository
                            .findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                                    search.trim(),
                                    search.trim()
                            );

        } else if (role != null) {

            users = userRepository.findByRole(role);

        } else {

            users = userRepository.findAll();
        }

        return users.stream()
                .map(this::mapToDto)
                .toList();
    }

    // ================= GET USER BY ID =================

    @Override
    public AdminUserResponseDto getUserById(Long id) {

        User user = findUser(id);

        return mapToDto(user);
    }

    // ================= BLOCK USER =================

    @Override
    public AdminUserResponseDto blockUser(Long id) {

        User user = findUser(id);

        // Prevent admin accounts from being blocked
        if (user.getRole() == Role.ADMIN) {
            throw new RuntimeException(
                    "Admin account cannot be blocked"
            );
        }

        if (!user.isActive()) {
            throw new RuntimeException(
                    "User is already blocked"
            );
        }

        user.setActive(false);

        User savedUser = userRepository.save(user);

        return mapToDto(savedUser);
    }

    // ================= UNBLOCK USER =================

    @Override
    public AdminUserResponseDto unblockUser(Long id) {

        User user = findUser(id);

        if (user.getRole() == Role.ADMIN) {
            throw new RuntimeException(
                    "Admin account cannot be modified"
            );
        }

        if (user.isActive()) {
            throw new RuntimeException(
                    "User is already active"
            );
        }

        user.setActive(true);

        User savedUser = userRepository.save(user);

        return mapToDto(savedUser);
    }

    // ================= HELPER METHODS =================

    private User findUser(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with id: " + id
                        ));
    }

    private AdminUserResponseDto mapToDto(User user) {

        return new AdminUserResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getMobile(),
                user.getRole(),
                user.isActive()
        );
    }
}