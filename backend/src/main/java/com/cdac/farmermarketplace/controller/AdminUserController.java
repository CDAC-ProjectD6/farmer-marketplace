package com.cdac.farmermarketplace.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.farmermarketplace.dto.response.AdminUserResponseDto;
import com.cdac.farmermarketplace.entity.Role;
import com.cdac.farmermarketplace.service.AdminUserService;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private final AdminUserService adminUserService;

    public AdminUserController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    // GET /api/admin/users
    // GET /api/admin/users?search=test
    // GET /api/admin/users?role=FARMER
    // GET /api/admin/users?search=test&role=FARMER
    @GetMapping
    public ResponseEntity<List<AdminUserResponseDto>> getUsers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Role role) {

        return ResponseEntity.ok(
                adminUserService.getUsers(search, role)
        );
    }

    // GET /api/admin/users/{id}
    @GetMapping("/{id}")
    public ResponseEntity<AdminUserResponseDto> getUserById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                adminUserService.getUserById(id)
        );
    }

    // PATCH /api/admin/users/{id}/block
    @PatchMapping("/{id}/block")
    public ResponseEntity<AdminUserResponseDto> blockUser(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                adminUserService.blockUser(id)
        );
    }

    // PATCH /api/admin/users/{id}/unblock
    @PatchMapping("/{id}/unblock")
    public ResponseEntity<AdminUserResponseDto> unblockUser(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                adminUserService.unblockUser(id)
        );
    }
}