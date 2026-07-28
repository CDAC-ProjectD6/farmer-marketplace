package com.cdac.farmermarketplace.service;

import java.util.List;

import com.cdac.farmermarketplace.dto.request.CategoryRequest;
import com.cdac.farmermarketplace.dto.response.CategoryResponse;

public interface CategoryService {

    CategoryResponse createCategory(CategoryRequest request);

    List<CategoryResponse> getAllCategories();

    CategoryResponse getCategoryById(Long id);

    CategoryResponse updateCategory(Long id, CategoryRequest request);

    void deleteCategory(Long id);
    
    List<CategoryResponse> getActiveCategories();

    List<CategoryResponse> searchCategories(String keyword);
}