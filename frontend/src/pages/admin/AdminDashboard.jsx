import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import api from "../../services/api";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/dashboard");

      setDashboard(response.data);
      setError("");
    } catch (error) {
      console.error("Error loading admin dashboard:", error);
      setError("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h5>Loading dashboard...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  const orderStatusData = [
    { name: "Pending", value: dashboard.pendingOrders || 0 },
    { name: "Confirmed", value: dashboard.confirmedOrders || 0 },
    { name: "Paid", value: dashboard.paidOrders || 0 },
    { name: "Shipped", value: dashboard.shippedOrders || 0 },
    { name: "Delivered", value: dashboard.deliveredOrders || 0 },
    { name: "Cancelled", value: dashboard.cancelledOrders || 0 },
  ];

  const categoryData = dashboard.productsByCategory || [];
  const recentOrders = dashboard.recentOrders || [];
  const topSellingProducts = dashboard.topSellingProducts || [];

  const pieColors = [
    "#198754",
    "#0d6efd",
    "#ffc107",
    "#0dcaf0",
    "#6f42c1",
    "#dc3545",
  ];

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Admin Dashboard</h2>

        <p className="text-muted mb-0">
          Marketplace overview and analytics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">

        <DashboardCard
          title="Total Users"
          value={dashboard.totalUsers}
        />

        <DashboardCard
          title="Farmers"
          value={dashboard.totalFarmers}
        />

        <DashboardCard
          title="Consumers"
          value={dashboard.totalCustomers}
        />

        <DashboardCard
          title="Products"
          value={dashboard.totalProducts}
        />

        <DashboardCard
          title="Orders"
          value={dashboard.totalOrders}
        />

        <DashboardCard
          title="Pending Approvals"
          value={dashboard.pendingFarmerApprovals}
        />

        <DashboardCard
          title="Total Sales"
          value={`₹${Number(
            dashboard.totalSales || 0
          ).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
          })}`}
        />

      </div>

      {/* Charts */}
      <div className="row g-4 mb-4">

        {/* Orders by Status */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5 className="fw-bold mb-4">
                Orders by Status
              </h5>

              {dashboard.totalOrders > 0 ? (
                <div style={{ width: "100%", height: 320 }}>
                  <ResponsiveContainer>

                    <PieChart>

                      <Pie
                        data={orderStatusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        outerRadius={90}
                        label
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={
                              pieColors[index % pieColors.length]
                            }
                          />
                        ))}
                      </Pie>

                      <Tooltip />

                      <Legend />

                    </PieChart>

                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center text-muted py-5">
                  No order data available.
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Products by Category */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5 className="fw-bold mb-4">
                Products by Category
              </h5>

              {categoryData.length > 0 ? (
                <div style={{ width: "100%", height: 320 }}>
                  <ResponsiveContainer>

                    <BarChart data={categoryData}>

                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis dataKey="categoryName" />

                      <YAxis allowDecimals={false} />

                      <Tooltip />

                      <Bar
                        dataKey="productCount"
                        fill="#198754"
                        name="Products"
                      />

                    </BarChart>

                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center text-muted py-5">
                  No category data available.
                </div>
              )}

            </div>
          </div>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <h5 className="fw-bold mb-3">
            Recent Orders
          </h5>

          {recentOrders.length > 0 ? (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>

                  {recentOrders.map((order) => (

                    <tr key={order.orderId}>

                      <td>#{order.orderId}</td>

                      <td>{order.customerName}</td>

                      <td>
                        ₹{Number(
                          order.totalAmount || 0
                        ).toFixed(2)}
                      </td>

                      <td>
                        <span className="badge bg-secondary">
                          {order.status}
                        </span>
                      </td>

                      <td>
                        {order.orderDate
                          ? new Date(
                              order.orderDate
                            ).toLocaleString()
                          : "-"}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="text-center text-muted py-4">
              No recent orders available.
            </div>

          )}

        </div>
      </div>

      {/* Top Selling Products */}
      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <h5 className="fw-bold mb-3">
            Top Selling Products
          </h5>

          {topSellingProducts.length > 0 ? (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-light">
                  <tr>
                    <th>Rank</th>
                    <th>Product</th>
                    <th>Quantity Sold</th>
                  </tr>
                </thead>

                <tbody>

                  {topSellingProducts.map((product, index) => (

                    <tr key={product.productId}>

                      <td>{index + 1}</td>

                      <td>{product.productName}</td>

                      <td>{product.quantitySold}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="text-center text-muted py-4">
              No sales data available yet.
            </div>

          )}

        </div>
      </div>

    </div>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="col-sm-6 col-lg-3">

      <div className="card shadow-sm border-0 h-100">

        <div className="card-body">

          <p className="text-muted mb-2">
            {title}
          </p>

          <h3 className="fw-bold mb-0">
            {value}
          </h3>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;