package com.cdac.farmermarketplace.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SecurityUtils {

    private final UserRepository userRepository;


    public User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                .getContext()
                .getAuthentication();


        String email = authentication.getName();


        return userRepository.findByEmail(email)
                .orElseThrow(
                    () -> new RuntimeException("User not found")
                );
    }
}
