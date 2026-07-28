package com.cdac.farmermarketplace.service;

import java.util.List;

import com.cdac.farmermarketplace.dto.response.AdminFarmerResponseDto;
import com.cdac.farmermarketplace.entity.FarmerApprovalStatus;

public interface AdminFarmerService {

    List<AdminFarmerResponseDto> getFarmers(
            String search,
            FarmerApprovalStatus status
    );

    List<AdminFarmerResponseDto> getPendingFarmers();

    AdminFarmerResponseDto getFarmerById(Long id);

    AdminFarmerResponseDto approveFarmer(Long id);

    AdminFarmerResponseDto rejectFarmer(Long id);
}