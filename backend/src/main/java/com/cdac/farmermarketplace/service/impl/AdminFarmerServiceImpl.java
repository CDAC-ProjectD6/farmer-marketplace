package com.cdac.farmermarketplace.service.impl;

import java.util.List;
import com.cdac.farmermarketplace.service.NotificationService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.farmermarketplace.dto.response.AdminFarmerResponseDto;
import com.cdac.farmermarketplace.entity.FarmerApprovalStatus;
import com.cdac.farmermarketplace.entity.Role;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.repository.UserRepository;
import com.cdac.farmermarketplace.service.AdminFarmerService;

@Service
@Transactional
public class AdminFarmerServiceImpl implements AdminFarmerService {

	private final UserRepository userRepository;
	private final NotificationService notificationService;

	public AdminFarmerServiceImpl(
	        UserRepository userRepository,
	        NotificationService notificationService) {

	    this.userRepository = userRepository;
	    this.notificationService = notificationService;
	}

    // ==================== GET ALL FARMERS ====================

    @Override
    @Transactional(readOnly = true)
    public List<AdminFarmerResponseDto> getFarmers(
            String search,
            FarmerApprovalStatus status) {

        List<User> farmers;

        boolean hasSearch =
                search != null && !search.trim().isEmpty();

        if (hasSearch && status != null) {

            String keyword = search.trim();

            farmers =
                    userRepository
                            .findByRoleAndFarmerApprovalStatusAndNameContainingIgnoreCaseOrRoleAndFarmerApprovalStatusAndEmailContainingIgnoreCase(
                                    Role.FARMER,
                                    status,
                                    keyword,
                                    Role.FARMER,
                                    status,
                                    keyword
                            );

        } else if (hasSearch) {

            String keyword = search.trim();

            farmers =
                    userRepository
                            .findByRoleAndNameContainingIgnoreCaseOrRoleAndEmailContainingIgnoreCase(
                                    Role.FARMER,
                                    keyword,
                                    Role.FARMER,
                                    keyword
                            );

        } else if (status != null) {

            farmers =
                    userRepository.findByRoleAndFarmerApprovalStatus(
                            Role.FARMER,
                            status
                    );

        } else {

            farmers = userRepository.findByRole(Role.FARMER);
        }

        return farmers.stream()
                .map(this::convertToDto)
                .toList();
    }

    // ==================== GET PENDING FARMERS ====================

    @Override
    @Transactional(readOnly = true)
    public List<AdminFarmerResponseDto> getPendingFarmers() {

        return userRepository
                .findByRoleAndFarmerApprovalStatus(
                        Role.FARMER,
                        FarmerApprovalStatus.PENDING
                )
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    // ==================== GET FARMER BY ID ====================

    @Override
    @Transactional(readOnly = true)
    public AdminFarmerResponseDto getFarmerById(Long id) {

        User farmer = getFarmer(id);

        return convertToDto(farmer);
    }

    // ==================== APPROVE FARMER ====================

    @Override
    public AdminFarmerResponseDto approveFarmer(Long id) {

        User farmer = getFarmer(id);

        if (farmer.getFarmerApprovalStatus()
                == FarmerApprovalStatus.APPROVED) {

            throw new RuntimeException(
                    "Farmer is already approved"
            );
        }

        farmer.setFarmerApprovalStatus(
                FarmerApprovalStatus.APPROVED
        );

        User savedFarmer = userRepository.save(farmer);

        notificationService.createNotification(
                savedFarmer,
                "Farmer Approved",
                "Congratulations! Your farmer account has been approved."
        );

        return convertToDto(savedFarmer);
    }

    // ==================== REJECT FARMER ====================

    @Override
    public AdminFarmerResponseDto rejectFarmer(Long id) {

        User farmer = getFarmer(id);

        if (farmer.getFarmerApprovalStatus()
                == FarmerApprovalStatus.REJECTED) {

            throw new RuntimeException(
                    "Farmer is already rejected"
            );
        }

        farmer.setFarmerApprovalStatus(
                FarmerApprovalStatus.REJECTED
        );

        User savedFarmer = userRepository.save(farmer);

        notificationService.createNotification(
                savedFarmer,
                "Farmer Rejected",
                "Your farmer account approval request has been rejected."
        );

        return convertToDto(savedFarmer);
    }

    // ==================== FIND VALID FARMER ====================

    private User getFarmer(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Farmer not found")
                );

        if (user.getRole() != Role.FARMER) {

            throw new RuntimeException(
                    "User is not a farmer"
            );
        }

        return user;
    }

    // ==================== CONVERT TO DTO ====================

    private AdminFarmerResponseDto convertToDto(User farmer) {

        return new AdminFarmerResponseDto(
                farmer.getId(),
                farmer.getName(),
                farmer.getEmail(),
                farmer.getMobile(),
                farmer.isActive(),
                farmer.getFarmerApprovalStatus()
        );
    }
}