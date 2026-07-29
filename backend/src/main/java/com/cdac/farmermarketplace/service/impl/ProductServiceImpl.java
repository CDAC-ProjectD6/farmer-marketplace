package com.cdac.farmermarketplace.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.dto.request.ProductRequestDto;
import com.cdac.farmermarketplace.dto.response.ProductResponseDto;
import com.cdac.farmermarketplace.entity.Category;
import com.cdac.farmermarketplace.entity.Product;
import com.cdac.farmermarketplace.entity.Review;
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.exception.ResourceNotFoundException;
import com.cdac.farmermarketplace.repository.CategoryRepository;
import com.cdac.farmermarketplace.repository.ProductRepository;
import com.cdac.farmermarketplace.repository.ReviewRepository;
import com.cdac.farmermarketplace.repository.UserRepository;
import com.cdac.farmermarketplace.service.AuthorizationService;
import com.cdac.farmermarketplace.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {


    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    private final CategoryRepository categoryRepository;

    private final AuthorizationService authorizationService;

    private final ReviewRepository reviewRepository;



    public ProductServiceImpl(
            ProductRepository productRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository,
            AuthorizationService authorizationService,
            ReviewRepository reviewRepository) {


        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.authorizationService = authorizationService;
        this.reviewRepository = reviewRepository;
    }




    // ================= CREATE PRODUCT =================

    @Override
    public ProductResponseDto saveProduct(ProductRequestDto requestDto) {


        Product product = new Product();


        product.setName(requestDto.getName());
        product.setDescription(requestDto.getDescription());
        product.setPrice(requestDto.getPrice());
        product.setStock(requestDto.getStock());
        product.setBrand(requestDto.getBrand());
        product.setImageUrl(requestDto.getImageUrl());



        Category category =
                categoryRepository.findById(requestDto.getCategoryId())
                .orElseThrow(() ->
                    new ResourceNotFoundException("Category not found"));



        product.setCategory(category);



        product.setActive(
                requestDto.getActive()!=null
                ? requestDto.getActive()
                : true
        );



        Authentication authentication =
                SecurityContextHolder
                .getContext()
                .getAuthentication();



        User farmer =
                userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                    new RuntimeException("Logged in user not found"));



        product.setFarmer(farmer);



        return convertToResponse(
                productRepository.save(product)
        );
    }







    // ================= UPDATE PRODUCT =================


    @Override
    public ProductResponseDto updateProduct(
            Long id,
            ProductRequestDto requestDto) {


        Product product =
                productRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Product not found"));



        authorizationService.verifyProductOwnership(product);



        product.setName(requestDto.getName());
        product.setDescription(requestDto.getDescription());
        product.setPrice(requestDto.getPrice());
        product.setStock(requestDto.getStock());
        product.setBrand(requestDto.getBrand());
        product.setImageUrl(requestDto.getImageUrl());



        Category category =
                categoryRepository.findById(requestDto.getCategoryId())
                .orElseThrow(() ->
                    new ResourceNotFoundException("Category not found"));



        product.setCategory(category);

        product.setActive(requestDto.getActive());



        return convertToResponse(
                productRepository.save(product)
        );

    }







    // ================= DELETE PRODUCT =================


    @Override
    public void deleteProduct(Long id) {


        Product product =
                productRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Product not found"));



        authorizationService.verifyProductOwnership(product);



        productRepository.delete(product);

    }







    // ================= GET PRODUCT BY ID =================


    @Override
    public ProductResponseDto getProductById(Long id) {


        Product product =
                productRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Product not found"));



        return convertToResponse(product);

    }







    // ================= ALL PRODUCTS =================


    @Override
    public List<ProductResponseDto> getAllProducts() {


        List<ProductResponseDto> list =
                new ArrayList<>();


        for(Product product : productRepository.findAll()){

            list.add(
                convertToResponse(product)
            );

        }


        return list;

    }







    @Override
    public ProductResponseDto getProductByName(String name) {


        Product product =
                productRepository.findByName(name)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Product not found"));



        return convertToResponse(product);

    }







    @Override
    public List<ProductResponseDto> searchProducts(String keyword) {


        List<ProductResponseDto> response =
                new ArrayList<>();


        for(Product product :
                productRepository.findByNameContainingIgnoreCase(keyword)){


            response.add(
                    convertToResponse(product)
            );

        }


        return response;

    }







    @Override
    public List<ProductResponseDto> getActiveProducts() {


        List<ProductResponseDto> response =
                new ArrayList<>();


        for(Product product :
                productRepository.findByActiveTrue()){


            response.add(
                    convertToResponse(product)
            );

        }


        return response;

    }







    @Override
    public List<ProductResponseDto> getAvailableProducts() {


        List<ProductResponseDto> response =
                new ArrayList<>();


        for(Product product :
                productRepository.findByStockGreaterThan(0)){


            response.add(
                    convertToResponse(product)
            );

        }


        return response;

    }







    @Override
    public List<ProductResponseDto> getProductsByCategory(Long categoryId) {


        List<ProductResponseDto> response =
                new ArrayList<>();


        for(Product product :
                productRepository.findByCategoryId(categoryId)){


            response.add(
                    convertToResponse(product)
            );

        }


        return response;

    }







    @Override
    public List<ProductResponseDto> getProductsByFarmer(Long farmerId) {


        List<ProductResponseDto> response =
                new ArrayList<>();


        for(Product product :
                productRepository.findByFarmerId(farmerId)){


            response.add(
                    convertToResponse(product)
            );

        }


        return response;

    }







    @Override
    public List<ProductResponseDto> getProductsByCategoryName(String categoryName) {


        List<ProductResponseDto> response =
                new ArrayList<>();


        for(Product product :
                productRepository
                .findByCategory_NameContainingIgnoreCase(categoryName)){


            response.add(
                    convertToResponse(product)
            );

        }


        return response;

    }







    @Override
    public List<ProductResponseDto> getProductsByPriceRange(
            BigDecimal minPrice,
            BigDecimal maxPrice) {


        List<ProductResponseDto> response =
                new ArrayList<>();


        for(Product product :
                productRepository.findByPriceBetween(minPrice,maxPrice)){


            response.add(
                    convertToResponse(product)
            );

        }


        return response;

    }







    @Override
    public List<ProductResponseDto> getProductsByStock(Integer stock) {


        List<ProductResponseDto> response =
                new ArrayList<>();


        for(Product product :
                productRepository.findByStock(stock)){


            response.add(
                    convertToResponse(product)
            );

        }


        return response;

    }








    // ================= ENTITY TO DTO =================


    private ProductResponseDto convertToResponse(Product product){


        ProductResponseDto dto =
                new ProductResponseDto();



        dto.setId(product.getId());

        dto.setName(product.getName());

        dto.setDescription(product.getDescription());

        dto.setPrice(product.getPrice());

        dto.setStock(product.getStock());

        dto.setBrand(product.getBrand());

        dto.setImageUrl(product.getImageUrl());

        dto.setActive(product.getActive());



        if(product.getCategory()!=null){

            dto.setCategoryId(
                    product.getCategory().getId()
            );


            dto.setCategoryName(
                    product.getCategory().getName()
            );

        }




        if(product.getFarmer()!=null){

            dto.setFarmerId(
                    product.getFarmer().getId()
            );


            dto.setFarmerName(
                    product.getFarmer().getName()
            );

        }



        dto.setCreatedAt(product.getCreatedAt());

        dto.setUpdatedAt(product.getUpdatedAt());


        dto.setAverageRating(
                reviewRepository.findAverageRating(
                        product.getId()
                )
        );


        dto.setReviewCount(
                reviewRepository.countReviews(
                        product.getId()
                )
        );





        // ================= REVIEW DATA =================


        List<Review> reviews =
                reviewRepository.findByProduct(product);



        dto.setReviewCount(
                (long) reviews.size()
        );



        if(reviews.isEmpty()){

            dto.setAverageRating(0.0);

        }
        else{


            double avg =
                    reviews.stream()
                    .mapToInt(Review::getRating)
                    .average()
                    .orElse(0.0);



            dto.setAverageRating(
                    Math.round(avg * 10.0)/10.0
            );

        }



        return dto;

    }


}