package com.cdac.farmermarketplace.service;

import com.cdac.farmermarketplace.entity.User;

public interface JwtService {

    String generateAccessToken(User user);

    String generateRefreshToken(User user);

    String extractEmail(String token);

    String extractTokenType(String token);

    boolean isTokenValid(String token);

    boolean isRefreshTokenValid(String token);
}