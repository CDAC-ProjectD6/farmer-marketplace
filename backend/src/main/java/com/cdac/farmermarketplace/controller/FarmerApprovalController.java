package com.cdac.farmermarketplace.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.farmermarketplace.dto.response.FarmerResponse;
import com.cdac.farmermarketplace.service.FarmerApprovalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/test/farmers")
@RequiredArgsConstructor
public class FarmerApprovalController {

    private final FarmerApprovalService farmerApprovalService;

    @GetMapping
    public ResponseEntity<List<FarmerResponse>> getAllFarmers() {

        return ResponseEntity.ok(
                farmerApprovalService.getAllFarmers());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<FarmerResponse>> getPendingFarmers() {

        return ResponseEntity.ok(
                farmerApprovalService.getPendingFarmers());
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<FarmerResponse> approveFarmer(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                farmerApprovalService.approveFarmer(id));
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<FarmerResponse> rejectFarmer(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                farmerApprovalService.rejectFarmer(id));
    }
}