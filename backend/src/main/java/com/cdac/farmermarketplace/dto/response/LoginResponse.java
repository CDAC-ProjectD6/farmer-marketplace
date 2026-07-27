package com.cdac.farmermarketplace.dto.response;

import com.cdac.farmermarketplace.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {

    private String accessToken;
    private String refreshToken;
    private Long userId;
    private String name;
    private String email;
    private Role role;
}