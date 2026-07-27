package com.cdac.farmermarketplace.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.farmermarketplace.dto.request.LoginRequest;
import com.cdac.farmermarketplace.dto.request.RegisterRequest;
import com.cdac.farmermarketplace.dto.response.LoginResponse;
import com.cdac.farmermarketplace.service.AuthService;
import com.cdac.farmermarketplace.dto.request.RefreshTokenRequest;
import com.cdac.farmermarketplace.dto.request.ForgotPasswordRequest;
import com.cdac.farmermarketplace.dto.request.VerifyOtpRequest;
import com.cdac.farmermarketplace.dto.request.ResetPasswordRequest;


import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequest request) {

        authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }
    
    
    @PostMapping("/refresh")
    public ResponseEntity<LoginResponse> refreshToken(
            @Valid @RequestBody RefreshTokenRequest request) {

        LoginResponse response = authService.refreshToken(request);

        return ResponseEntity.ok(response);
    }
    
    
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        authService.forgotPassword(request);

        return ResponseEntity.ok(
                "OTP sent successfully to your email"
        );
    }
    
    
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(
            @Valid @RequestBody VerifyOtpRequest request) {

        authService.verifyOtp(request);

        return ResponseEntity.ok("OTP verified successfully");
    }
    
    
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        authService.resetPassword(request);

        return ResponseEntity.ok(
                "Password reset successfully"
        );
    }
}