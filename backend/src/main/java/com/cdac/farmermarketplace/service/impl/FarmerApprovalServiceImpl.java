package com.cdac.farmermarketplace.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.dto.response.FarmerResponse;
import com.cdac.farmermarketplace.entity.Role;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.enums.FarmerApprovalStatus;
import com.cdac.farmermarketplace.repository.UserRepository;
import com.cdac.farmermarketplace.service.FarmerApprovalService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FarmerApprovalServiceImpl implements FarmerApprovalService {

    private final UserRepository userRepository;

    @Override
    public List<FarmerResponse> getAllFarmers() {

        return userRepository.findByRole(Role.FARMER)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<FarmerResponse> getPendingFarmers() {

        return userRepository.findByRoleAndFarmerApprovalStatus(
                Role.FARMER,
                FarmerApprovalStatus.PENDING)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public FarmerResponse approveFarmer(Long id) {

        User farmer = userRepository.findByIdAndRole(id, Role.FARMER)
                .orElseThrow(() ->
                        new RuntimeException("Farmer not found"));

        farmer.setFarmerApprovalStatus(FarmerApprovalStatus.APPROVED);

        userRepository.save(farmer);

        return mapToResponse(farmer);
    }

    @Override
    public FarmerResponse rejectFarmer(Long id) {

        User farmer = userRepository.findByIdAndRole(id, Role.FARMER)
                .orElseThrow(() ->
                        new RuntimeException("Farmer not found"));

        farmer.setFarmerApprovalStatus(FarmerApprovalStatus.REJECTED);

        userRepository.save(farmer);

        return mapToResponse(farmer);
    }

    private FarmerResponse mapToResponse(User user) {

        return new FarmerResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getMobile(),
                user.getFarmerApprovalStatus()
        );
    }
}