package com.cdac.farmermarketplace.service;

import org.springframework.security.core.Authentication;

import com.cdac.farmermarketplace.dto.request.ChangePasswordRequestDto;
import com.cdac.farmermarketplace.dto.request.UpdateProfileRequestDto;
import com.cdac.farmermarketplace.dto.response.ProfileResponseDto;

import jakarta.validation.Valid;

public interface ProfileService {

    ProfileResponseDto getProfile(Authentication authentication);

    ProfileResponseDto updateProfile(
            UpdateProfileRequestDto request,
            Authentication authentication
    );

    void changePassword(
            ChangePasswordRequestDto request,
            Authentication authentication
    );

}