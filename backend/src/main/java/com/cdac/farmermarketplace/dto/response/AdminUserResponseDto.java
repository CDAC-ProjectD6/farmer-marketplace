package com.cdac.farmermarketplace.dto.response;

import com.cdac.farmermarketplace.entity.Role;

public class AdminUserResponseDto {

    private Long id;
    private String name;
    private String email;
    private String mobile;
    private Role role;
    private boolean active;

    public AdminUserResponseDto() {
    }

    public AdminUserResponseDto(
            Long id,
            String name,
            String email,
            String mobile,
            Role role,
            boolean active) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.role = role;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}