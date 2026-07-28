package com.cdac.farmermarketplace.repository;

import java.util.List;
import com.cdac.farmermarketplace.enums.FarmerApprovalStatus;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.farmermarketplace.entity.Role;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.enums.FarmerApprovalStatus;
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByMobile(String mobile);

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
    
    List<User> findByRoleAndApprovalStatus(
            Role role,
            FarmerApprovalStatus approvalStatus
    );

    Optional<User> findByIdAndRole(
            Long id,
            Role role
    );
}