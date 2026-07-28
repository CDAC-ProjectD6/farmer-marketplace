package com.cdac.farmermarketplace.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.farmermarketplace.dto.request.ChangePasswordRequestDto;
import com.cdac.farmermarketplace.dto.request.UpdateProfileRequestDto;
import com.cdac.farmermarketplace.dto.response.ProfileResponseDto;
import com.cdac.farmermarketplace.service.ProfileService;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/profile")
public class ProfileController {


    private final ProfileService profileService;


    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }



    @GetMapping
    public ResponseEntity<ProfileResponseDto> getProfile(
            Authentication authentication) {


        return ResponseEntity.ok(
                profileService.getProfile(authentication)
        );

    }

    @PutMapping
    public ResponseEntity<ProfileResponseDto> updateProfile(
            @Valid @RequestBody UpdateProfileRequestDto request,
            Authentication authentication) {

        return ResponseEntity.ok(
                profileService.updateProfile(request, authentication)
        );
    }
    
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @Valid @RequestBody ChangePasswordRequestDto request,
            Authentication authentication) {

        profileService.changePassword(request, authentication);

        return ResponseEntity.ok("Password changed successfully.");
    }
}
