package com.cdac.farmermarketplace.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.cdac.farmermarketplace.entity.Role;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.repository.UserRepository;

@Component
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.email:}")
    private String adminEmail;

    @Value("${admin.password:}")
    private String adminPassword;

    @Value("${admin.mobile:}")
    private String adminMobile;

    public AdminSeeder(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (adminEmail.isBlank()
                || adminPassword.isBlank()
                || adminMobile.isBlank()) {

            System.out.println(
                    "Admin credentials not configured. Skipping admin creation."
            );
            return;
        }

        if (userRepository.existsByEmail(adminEmail)) {
            return;
        }

        User admin = new User();

        admin.setName("System Admin");
        admin.setEmail(adminEmail);
        admin.setMobile(adminMobile);
        admin.setPassword(passwordEncoder.encode(adminPassword));
        admin.setRole(Role.ADMIN);
        admin.setActive(true);

        userRepository.save(admin);

        System.out.println("Default admin created successfully.");
    }
}