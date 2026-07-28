import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// Customer pages
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
import FarmerProducts from "../pages/farmer/FarmerProducts";
import AddProduct from "../pages/farmer/AddProduct";
import EditProduct from "../pages/farmer/EditProduct";

import ProductManagement from "../pages/admin/ProductManagement";


function AppRoutes() {

  return (

    <Routes>

      {/* Customer Layout */}

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


        {/* Cart */}

        <Route
          path="cart"
          element={<Cart />}
        />


        <Route
          path="wishlist"
          element={<Wishlist />}
        />



        {/* Checkout & Orders */}

        <Route
          path="checkout"
          element={<Checkout />}
        />


        <Route
          path="order-success"
          element={<OrderSuccess />}
        />


        <Route
          path="orders"
          element={
            <ProtectedRoute allowedRoles={["CONSUMER", "FARMER"]}>
              <MyOrders />
            </ProtectedRoute>
          }
        />


        <Route
          path="orders/:orderId"
          element={
            <ProtectedRoute allowedRoles={["CONSUMER", "FARMER"]}>
              <OrderDetails />
            </ProtectedRoute>
          }
        />



        {/* Customer Profile */}

        <Route
          path="profile"
          element={
            <ProtectedRoute
              allowedRoles={["CONSUMER", "FARMER", "ADMIN"]}
            >
              <ProfilePage />
            </ProtectedRoute>
          }
        />



        {/* Temporary API Testing */}

        <Route
          path="orders-test"
          element={<OrderTest />}
        />



        {/* Admin Category */}

        <Route
          path="category-management"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CategoryList />
            </ProtectedRoute>
          }
        />



        {/* Admin Users */}

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



        {/* Farmer Approval */}

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

{/* Product Management */}

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

<Route
  path="admin/products"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <ProductManagement />
    </ProtectedRoute>
  }
/>


        {/* Static Pages */}

        <Route
          path="about"
          element={<About />}
        />


        <Route
          path="contact"
          element={<Contact />}
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