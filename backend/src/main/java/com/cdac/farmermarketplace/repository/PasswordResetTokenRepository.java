package com.cdac.farmermarketplace.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.farmermarketplace.entity.PasswordResetToken;
import com.cdac.farmermarketplace.entity.User;

public interface PasswordResetTokenRepository
        extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken>
        findTopByUserAndUsedFalseOrderByCreatedAtDesc(User user);
}