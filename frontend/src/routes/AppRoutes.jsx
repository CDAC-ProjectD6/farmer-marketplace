import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// ================= CUSTOMER PAGES =================

import Home from "../pages/customer/Home";
import Products from "../pages/customer/Products";
import ProductDetails from "../pages/customer/ProductDetails";
import Categories from "../pages/customer/Categories";
import About from "../pages/customer/About";
import Contact from "../pages/customer/Contact";
import Cart from "../pages/customer/Cart";
import Wishlist from "../pages/customer/Wishlist";
import Checkout from "../pages/customer/Checkout";
import MyOrders from "../pages/customer/MyOrders";
import OrderDetails from "../pages/customer/OrderDetails";
import OrderSuccess from "../pages/customer/OrderSuccess";
import OrderTest from "../pages/customer/OrderTest";
import ProfilePage from "../pages/customer/ProfilePage";

// ================= ADMIN PAGES =================

import CategoryList from "../pages/admin/CategoryList";
import Users from "../pages/admin/Users";
import UserDetails from "../pages/admin/UserDetails";
import Farmers from "../pages/admin/Farmers";
import FarmerDetails from "../pages/admin/FarmerDetails";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProductManagement from "../pages/admin/ProductManagement";
import ProductDetailsAdmin from "../pages/admin/ProductDetailsAdmin";
import OrdersAdmin from "../pages/admin/OrdersAdmin";
import OrderDetailsAdmin from "../pages/admin/OrderDetailsAdmin";

// ================= FARMER PAGES =================

import FarmerProducts from "../pages/farmer/FarmerProducts";
import AddProduct from "../pages/farmer/AddProduct";
import EditProduct from "../pages/farmer/EditProduct";
import FarmerOrders from "../pages/farmer/FarmerOrders";
import FarmerOrderDetails from "../pages/farmer/FarmerOrderDetails";

// ================= AUTH PAGES =================

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import ProtectedRoute from "./ProtectedRoute";


function AppRoutes() {

  return (

    <Routes>

      {/* ================= MAIN LAYOUT ================= */}

      <Route path="/" element={<MainLayout />}>

        {/* ================= CUSTOMER ================= */}

        <Route
          index
          element={<Home />}
        />

        <Route
          path="products"
          element={<Products />}
        />

        <Route
          path="products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="categories"
          element={<Categories />}
        />

        <Route
          path="cart"
          element={<Cart />}
        />

        <Route
          path="wishlist"
          element={<Wishlist />}
        />

        <Route
          path="checkout"
          element={<Checkout />}
        />

        <Route
          path="order-success"
          element={<OrderSuccess />}
        />


        {/* ================= CUSTOMER ORDERS ================= */}

        <Route
          path="orders"
          element={
            <ProtectedRoute
              allowedRoles={["CONSUMER", "FARMER"]}
            >
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="orders/:orderId"
          element={
            <ProtectedRoute
              allowedRoles={["CONSUMER", "FARMER"]}
            >
              <OrderDetails />
            </ProtectedRoute>
          }
        />


        {/* ================= PROFILE ================= */}

        <Route
          path="profile"
          element={
            <ProtectedRoute
              allowedRoles={[
                "CONSUMER",
                "FARMER",
                "ADMIN"
              ]}
            >
              <ProfilePage />
            </ProtectedRoute>
          }
        />


        {/* ================= TEMP TEST ================= */}

        <Route
          path="orders-test"
          element={<OrderTest />}
        />


        {/* ================= ADMIN DASHBOARD ================= */}

        <Route
          path="admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />


        {/* ================= ADMIN CATEGORY ================= */}

        <Route
          path="category-management"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CategoryList />
            </ProtectedRoute>
          }
        />


        {/* ================= ADMIN USERS ================= */}

        <Route
          path="admin/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin/users/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <UserDetails />
            </ProtectedRoute>
          }
        />


        {/* ================= FARMER APPROVAL ================= */}

        <Route
          path="admin/farmers"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Farmers />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin/farmers/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <FarmerDetails />
            </ProtectedRoute>
          }
        />


        {/* ================= FARMER PRODUCTS ================= */}

        <Route
          path="farmer/products"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <FarmerProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="farmer/products/add"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="farmer/products/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <EditProduct />
            </ProtectedRoute>
          }
        />


        {/* ================= FARMER ORDERS ================= */}

        <Route
          path="farmer/orders"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <FarmerOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="farmer/orders/:orderId"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <FarmerOrderDetails />
            </ProtectedRoute>
          }
        />


        {/* ================= ADMIN PRODUCTS ================= */}

        <Route
          path="admin/products"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ProductManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin/products/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ProductDetailsAdmin />
            </ProtectedRoute>
          }
        />


        {/* ================= ADMIN ORDERS ================= */}

        <Route
          path="admin/orders"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <OrdersAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin/orders/:orderId"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <OrderDetailsAdmin />
            </ProtectedRoute>
          }
        />


        {/* ================= STATIC PAGES ================= */}

        <Route
          path="about"
          element={<About />}
        />

        <Route
          path="contact"
          element={<Contact />}
        />

      </Route>


      {/* ================= AUTHENTICATION ================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

    </Routes>

  );
}


export default AppRoutes;