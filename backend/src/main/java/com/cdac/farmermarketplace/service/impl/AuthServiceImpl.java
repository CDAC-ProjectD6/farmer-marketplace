package com.cdac.farmermarketplace.service.impl;

import java.security.SecureRandom;
import com.cdac.farmermarketplace.enums.FarmerApprovalStatus;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.dto.request.ForgotPasswordRequest;
import com.cdac.farmermarketplace.dto.request.LoginRequest;
import com.cdac.farmermarketplace.dto.request.RefreshTokenRequest;
import com.cdac.farmermarketplace.dto.request.RegisterRequest;
import com.cdac.farmermarketplace.dto.request.VerifyOtpRequest;
import com.cdac.farmermarketplace.dto.response.LoginResponse;
import com.cdac.farmermarketplace.entity.PasswordResetToken;
import com.cdac.farmermarketplace.entity.Role;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.repository.PasswordResetTokenRepository;
import com.cdac.farmermarketplace.repository.UserRepository;
import com.cdac.farmermarketplace.service.AuthService;
import com.cdac.farmermarketplace.service.EmailService;
import com.cdac.farmermarketplace.service.JwtService;
import com.cdac.farmermarketplace.dto.request.ResetPasswordRequest;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            PasswordResetTokenRepository passwordResetTokenRepository,
            EmailService emailService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.emailService = emailService;
    }

    // ==================== REGISTER ====================

    @Override
    public void register(RegisterRequest request) {

//    	System.out.println("Admin Email = " + adminEmail);
//    	System.out.println("Exists = " + userRepository.existsByEmail(adminEmail));
    	
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }

        if (userRepository.existsByMobile(request.getMobile())) {
            throw new RuntimeException("Mobile number is already registered");
        }

        if (request.getRole() == Role.ADMIN) {
            throw new RuntimeException("Admin registration is not allowed");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole(request.getRole());
        user.setActive(true);

        if (request.getRole() == Role.FARMER) {
        	user.setApprovalStatus(FarmerApprovalStatus.PENDING);
        } else {
        	user.setApprovalStatus(FarmerApprovalStatus.APPROVED);
        }

        userRepository.save(user);
    }

    // ==================== LOGIN ====================

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }

        if (!user.isActive()) {
            throw new RuntimeException("User account is inactive");
        }

        String accessToken =
                jwtService.generateAccessToken(user);

        String refreshToken =
                jwtService.generateRefreshToken(user);

        return new LoginResponse(
                accessToken,
                refreshToken,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }

    // ==================== REFRESH TOKEN ====================

    @Override
    public LoginResponse refreshToken(RefreshTokenRequest request) {

        String refreshToken = request.getRefreshToken();

        if (!jwtService.isRefreshTokenValid(refreshToken)) {
            throw new RuntimeException(
                    "Invalid or expired refresh token");
        }

        String email = jwtService.extractEmail(refreshToken);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!user.isActive()) {
            throw new RuntimeException("User account is inactive");
        }

        String newAccessToken =
                jwtService.generateAccessToken(user);

        String newRefreshToken =
                jwtService.generateRefreshToken(user);

        return new LoginResponse(
                newAccessToken,
                newRefreshToken,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }

    // ==================== FORGOT PASSWORD ====================

    @Override
    public void forgotPassword(ForgotPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Generate secure 6-digit OTP
        SecureRandom random = new SecureRandom();

        String otp = String.format(
                "%06d",
                random.nextInt(1_000_000)
        );

        PasswordResetToken resetToken =
                new PasswordResetToken();

        resetToken.setUser(user);
        resetToken.setOtp(otp);

        // OTP expires after 5 minutes
        resetToken.setExpiresAt(
                LocalDateTime.now().plusMinutes(5)
        );

        resetToken.setUsed(false);

        // Save OTP in database
        passwordResetTokenRepository.save(resetToken);

        // Send OTP through email
        emailService.sendPasswordResetOtp(
                user.getEmail(),
                otp
        );
    }
    
    
    
 // ==================== VERIFY OTP ====================

    @Override
    public void verifyOtp(VerifyOtpRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        PasswordResetToken resetToken =
                passwordResetTokenRepository
                        .findTopByUserAndUsedFalseOrderByCreatedAtDesc(user)
                        .orElseThrow(() ->
                                new RuntimeException("OTP not found"));

        // Check OTP
        if (!resetToken.getOtp().equals(request.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }

        // Check expiry
        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP has expired");
        }
    }
    
    
 // ==================== RESET PASSWORD ====================

    @Override
    public void resetPassword(ResetPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        PasswordResetToken resetToken =
                passwordResetTokenRepository
                        .findTopByUserAndUsedFalseOrderByCreatedAtDesc(user)
                        .orElseThrow(() ->
                                new RuntimeException("OTP not found"));

        if (!resetToken.getOtp().equals(request.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }

        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP has expired");
        }

        // Save new password using BCrypt
        user.setPassword(
                passwordEncoder.encode(request.getNewPassword())
        );

        userRepository.save(user);

        // OTP cannot be reused
        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);
    }
    
 
}