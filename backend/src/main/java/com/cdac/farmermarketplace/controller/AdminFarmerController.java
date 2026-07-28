package com.cdac.farmermarketplace.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.farmermarketplace.dto.response.AdminFarmerResponseDto;
import com.cdac.farmermarketplace.entity.FarmerApprovalStatus;
import com.cdac.farmermarketplace.service.AdminFarmerService;

@RestController
@RequestMapping("/api/admin/farmers")
public class AdminFarmerController {

    private final AdminFarmerService adminFarmerService;

    public AdminFarmerController(
            AdminFarmerService adminFarmerService) {

        this.adminFarmerService = adminFarmerService;
    }

    // ==================== GET FARMERS ====================

    @GetMapping
    public ResponseEntity<List<AdminFarmerResponseDto>> getFarmers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false)
            FarmerApprovalStatus status) {

        return ResponseEntity.ok(
                adminFarmerService.getFarmers(
                        search,
                        status
                )
        );
    }

    // ==================== GET PENDING FARMERS ====================

    @GetMapping("/pending")
    public ResponseEntity<List<AdminFarmerResponseDto>>
    getPendingFarmers() {

        return ResponseEntity.ok(
                adminFarmerService.getPendingFarmers()
        );
    }

    // ==================== GET FARMER BY ID ====================

    @GetMapping("/{id}")
    public ResponseEntity<AdminFarmerResponseDto>
    getFarmerById(@PathVariable Long id) {

        return ResponseEntity.ok(
                adminFarmerService.getFarmerById(id)
        );
    }

    // ==================== APPROVE FARMER ====================

    @PatchMapping("/{id}/approve")
    public ResponseEntity<AdminFarmerResponseDto>
    approveFarmer(@PathVariable Long id) {

        return ResponseEntity.ok(
                adminFarmerService.approveFarmer(id)
        );
    }

    // ==================== REJECT FARMER ====================

    @PatchMapping("/{id}/reject")
    public ResponseEntity<AdminFarmerResponseDto>
    rejectFarmer(@PathVariable Long id) {

        return ResponseEntity.ok(
                adminFarmerService.rejectFarmer(id)
        );
    }
}