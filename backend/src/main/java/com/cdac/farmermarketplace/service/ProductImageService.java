package com.cdac.farmermarketplace.service;

import java.util.List;
import java.util.Optional;

import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.entity.ProductImage;

public interface ProductImageService {

    ProductImage saveImage(ProductImage image);

    ProductImage updateImage(Long id, ProductImage image);

    Optional<ProductImage> getImageById(Long id);

    List<ProductImage> getAllImages();

    void deleteImage(Long id);

    List<ProductImage> getImagesByProduct(Product product);

    List<ProductImage> getPrimaryImages();

}