package com.cdac.farmermarketplace.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProfileResponseDto {

    private Long id;

    private String name;

    private String email;

    private String mobile;

    private String role;
}