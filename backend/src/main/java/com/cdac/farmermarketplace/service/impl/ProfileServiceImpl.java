package com.cdac.farmermarketplace.service.impl;


import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.dto.request.ChangePasswordRequestDto;
import com.cdac.farmermarketplace.dto.request.UpdateProfileRequestDto;
import com.cdac.farmermarketplace.dto.response.ProfileResponseDto;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.repository.UserRepository;
import com.cdac.farmermarketplace.service.ProfileService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {


    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    
  


    @Override
    public ProfileResponseDto getProfile(Authentication authentication) {


        String email = authentication.getName();


        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                    new RuntimeException("User not found")
                );



        return new ProfileResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getMobile(),
                user.getRole().name()
        );
    }
    
    @Override
    public ProfileResponseDto updateProfile(
            UpdateProfileRequestDto request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setName(request.getName());
        user.setMobile(request.getMobile());

        User updatedUser = userRepository.save(user);

        return new ProfileResponseDto(
                updatedUser.getId(),
                updatedUser.getName(),
                updatedUser.getEmail(),
                updatedUser.getMobile(),
                updatedUser.getRole().name()
        );
    }

    @Override
    public void changePassword(ChangePasswordRequestDto request,
                               Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Verify current password
        if (!passwordEncoder.matches(request.getCurrentPassword(),
                                     user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        // Prevent same password
        if (passwordEncoder.matches(request.getNewPassword(),
                                    user.getPassword())) {
            throw new RuntimeException(
                    "New password must be different from current password");
        }

        // Save new password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }
    
   

}
