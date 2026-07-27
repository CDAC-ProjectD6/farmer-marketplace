package com.cdac.farmermarketplace.service.impl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendPasswordResetOtp(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("Farmer Marketplace - Password Reset OTP");

        message.setText(
                "Your password reset OTP is: " + otp +
                "\n\nThis OTP is valid for 5 minutes." +
                "\n\nIf you did not request a password reset, ignore this email."
        );

        mailSender.send(message);
    }
}