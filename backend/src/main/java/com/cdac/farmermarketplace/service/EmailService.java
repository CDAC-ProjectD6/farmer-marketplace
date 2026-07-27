package com.cdac.farmermarketplace.service;

public interface EmailService {

    void sendPasswordResetOtp(String toEmail, String otp);
}