package com.cdac.farmermarketplace.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.farmermarketplace.entity.FarmerApprovalStatus;
import com.cdac.farmermarketplace.entity.Role;
import com.cdac.farmermarketplace.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    // ==================== AUTH ====================

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByMobile(String mobile);


    // ==================== ADMIN USER MANAGEMENT ====================

    // Search users by name or email
    List<User> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String name,
            String email
    );

    // Filter users by role
    List<User> findByRole(Role role);

    // Search users and filter by role
    List<User> findByRoleAndNameContainingIgnoreCaseOrRoleAndEmailContainingIgnoreCase(
            Role role1,
            String name,
            Role role2,
            String email
    );


    // ==================== FARMER APPROVAL ====================

    // Filter farmers by approval status
    List<User> findByRoleAndFarmerApprovalStatus(
            Role role,
            FarmerApprovalStatus farmerApprovalStatus
    );

    // Search farmers and filter by approval status
    List<User>
    findByRoleAndFarmerApprovalStatusAndNameContainingIgnoreCaseOrRoleAndFarmerApprovalStatusAndEmailContainingIgnoreCase(
            Role role1,
            FarmerApprovalStatus status1,
            String name,
            Role role2,
            FarmerApprovalStatus status2,
            String email
    );
}