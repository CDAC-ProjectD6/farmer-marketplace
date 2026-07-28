package com.cdac.farmermarketplace.service;

import java.util.List;

import com.cdac.farmermarketplace.dto.response.FarmerResponse;

public interface FarmerApprovalService {

    List<FarmerResponse> getAllFarmers();

    List<FarmerResponse> getPendingFarmers();

    FarmerResponse approveFarmer(Long id);

    FarmerResponse rejectFarmer(Long id);
}