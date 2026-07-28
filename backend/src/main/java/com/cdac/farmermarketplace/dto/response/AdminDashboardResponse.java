package com.cdac.farmermarketplace.dto.response;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDashboardResponse {

    private Long totalUsers;

    private Long totalFarmers;

    private Long totalCustomers;

    private Long totalProducts;

    private Long totalOrders;

    private Long pendingFarmerApprovals;

    private BigDecimal totalSales;

    // Orders by status
    private Long pendingOrders;

    private Long confirmedOrders;

    private Long paidOrders;

    private Long shippedOrders;

    private Long deliveredOrders;

    private Long cancelledOrders;

    // Products by category
    private List<CategoryProductCountResponse> productsByCategory;

    // Recent orders
    private List<RecentOrderResponse> recentOrders;
    private List<TopSellingProductResponse> topSellingProducts;
}