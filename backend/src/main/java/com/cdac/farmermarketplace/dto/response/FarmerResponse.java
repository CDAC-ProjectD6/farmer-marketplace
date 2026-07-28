package com.cdac.farmermarketplace.dto.response;

import com.cdac.farmermarketplace.enums.FarmerApprovalStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FarmerResponse {

    private Long id;
    private String name;
    private String email;
    private String mobile;
    private FarmerApprovalStatus approvalStatus;

}
