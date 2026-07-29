package com.cdac.farmermarketplace.service;

import java.util.List;

import com.cdac.farmermarketplace.dto.request.ProductImageRequestDto;
import com.cdac.farmermarketplace.dto.response.ProductImageResponseDto;

public interface ProductImageService {

    ProductImageResponseDto saveImage(ProductImageRequestDto requestDto);

    ProductImageResponseDto updateImage(Long id, ProductImageRequestDto requestDto);

    ProductImageResponseDto getImageById(Long id);

    List<ProductImageResponseDto> getAllImages();

    void deleteImage(Long id);

    // Changed from taking a whole Product entity to just the ID
    List<ProductImageResponseDto> getImagesByProductId(Long productId);

    List<ProductImageResponseDto> getPrimaryImages();

}