package com.cdac.farmermarketplace.service.impl;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.dto.response.AdminDashboardResponse;
import com.cdac.farmermarketplace.dto.response.CategoryProductCountResponse;
import com.cdac.farmermarketplace.dto.response.RecentOrderResponse;
import com.cdac.farmermarketplace.dto.response.TopSellingProductResponse;
import com.cdac.farmermarketplace.entity.FarmerApprovalStatus;
import com.cdac.farmermarketplace.entity.Role;
import com.cdac.farmermarketplace.enums.OrderStatus;
import com.cdac.farmermarketplace.repository.OrderItemRepository;
import com.cdac.farmermarketplace.repository.OrderRepository;
import com.cdac.farmermarketplace.repository.ProductRepository;
import com.cdac.farmermarketplace.repository.UserRepository;
import com.cdac.farmermarketplace.service.AdminDashboardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminDashboardServiceImpl implements AdminDashboardService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public AdminDashboardResponse getDashboardSummary() {

        // Products by category
        List<CategoryProductCountResponse> productsByCategory =
                productRepository.countProductsByCategory()
                        .stream()
                        .map(row -> new CategoryProductCountResponse(
                                (String) row[0],
                                ((Number) row[1]).longValue()
                        ))
                        .toList();

        // Recent 5 orders
        List<RecentOrderResponse> recentOrders =
                orderRepository.findTop5ByOrderByOrderDateDesc()
                        .stream()
                        .map(order -> new RecentOrderResponse(
                                order.getId(),
                                order.getUser().getName(),
                                order.getTotalAmount(),
                                order.getStatus(),
                                order.getOrderDate()
                        ))
                        .toList();

        // Top 5 selling products
        List<TopSellingProductResponse> topSellingProducts =
                orderItemRepository
                        .findTopSellingProducts(PageRequest.of(0, 5))
                        .stream()
                        .map(row -> new TopSellingProductResponse(
                                (Long) row[0],
                                (String) row[1],
                                ((Number) row[2]).longValue()
                        ))
                        .toList();

        return AdminDashboardResponse.builder()

                .totalUsers(userRepository.count())

                .totalFarmers(
                        userRepository.countByRole(Role.FARMER)
                )

                .totalCustomers(
                        userRepository.countByRole(Role.CONSUMER)
                )

                .totalProducts(
                        productRepository.count()
                )

                .totalOrders(
                        orderRepository.count()
                )

                .pendingFarmerApprovals(
                        userRepository.countByRoleAndFarmerApprovalStatus(
                                Role.FARMER,
                                FarmerApprovalStatus.PENDING
                        )
                )

                .totalSales(
                        orderRepository.getTotalSales()
                )

                // Orders by status
                .pendingOrders(
                        orderRepository.countByStatus(OrderStatus.PENDING)
                )

                .confirmedOrders(
                        orderRepository.countByStatus(OrderStatus.CONFIRMED)
                )

                .paidOrders(
                        orderRepository.countByStatus(OrderStatus.PAID)
                )

                .shippedOrders(
                        orderRepository.countByStatus(OrderStatus.SHIPPED)
                )

                .deliveredOrders(
                        orderRepository.countByStatus(OrderStatus.DELIVERED)
                )

                .cancelledOrders(
                        orderRepository.countByStatus(OrderStatus.CANCELLED)
                )

                // Products by category
                .productsByCategory(productsByCategory)

                // Recent orders
                .recentOrders(recentOrders)

                // Top selling products
                .topSellingProducts(topSellingProducts)

                .build();
    }
}