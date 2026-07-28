package com.cdac.farmermarketplace.service;

import com.cdac.farmermarketplace.entity.Product;

public interface AuthorizationService {

    boolean isAdmin();

    void verifyProductOwnership(Product product);
}