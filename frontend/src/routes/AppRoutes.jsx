import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/customer/Home";
import Products from "../pages/customer/Products";
import ProductDetails from "../pages/customer/ProductDetails";
import Categories from "../pages/customer/Categories";
import About from "../pages/customer/About";
import Contact from "../pages/customer/Contact";
import Cart from "../pages/customer/Cart";
import Wishlist from "../pages/customer/Wishlist";

// Admin pages
import CategoryList from "../pages/admin/CategoryList";
import Users from "../pages/admin/Users";
import UserDetails from "../pages/admin/UserDetails";

import Farmers from "../pages/admin/Farmers";
import FarmerDetails from "../pages/admin/FarmerDetails";

// Auth pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<MainLayout />}>

        <Route index element={<Home />} />

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

        {/* ADMIN - Category Management */}
        <Route
          path="category-management"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CategoryList />
            </ProtectedRoute>
          }
        />

        {/* ADMIN - User Management */}
        <Route
          path="admin/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Users />
            </ProtectedRoute>
          }
        />

        {/* ADMIN - Farmer Approval */}
<Route
  path="admin/farmers"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Farmers />
    </ProtectedRoute>
  }
/>

        {/* ADMIN - User Details */}
        <Route
          path="admin/users/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <UserDetails />
            </ProtectedRoute>
          }
        />

        {/* ADMIN - Farmer Details */}
<Route
  path="admin/farmers/:id"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <FarmerDetails />
    </ProtectedRoute>
  }
/>

        <Route
          path="about"
          element={<About />}
        />

        <Route
          path="contact"
          element={<Contact />}
        />

        <Route
          path="cart"
          element={<Cart />}
        />

        <Route
          path="wishlist"
          element={<Wishlist />}
        />

      </Route>

      {/* Authentication */}
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