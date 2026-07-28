package com.cdac.farmermarketplace.service.impl;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.service.AuthorizationService;

@Service
public class AuthorizationServiceImpl implements AuthorizationService {

    @Override
    public boolean isAdmin() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return authentication.getAuthorities()
                .stream()
                .anyMatch(authority ->
                        authority.getAuthority().equals("ROLE_ADMIN"));
    }

    @Override
    public void verifyProductOwnership(Product product) {

        // Admin can manage any product
        if (isAdmin()) {
            return;
        }

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String loggedInEmail = authentication.getName();

        // Farmer can manage only own product
        if (product.getFarmer() == null ||
                !product.getFarmer().getEmail().equals(loggedInEmail)) {

            throw new AccessDeniedException(
                    "You can manage only your own products"
            );
        }
    }
}