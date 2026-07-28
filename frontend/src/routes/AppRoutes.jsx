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
import OrderTest from "../pages/customer/OrderTest";
import Checkout from "../pages/customer/Checkout";
import MyOrders from "../pages/customer/MyOrders";
import OrderDetails from "../pages/customer/OrderDetails";

import CategoryList from "../pages/admin/CategoryList";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import OrderSuccess from "../pages/customer/OrderSuccess";

import ProtectedRoute from "./ProtectedRoute";


function AppRoutes() {

  return (

    <Routes>


      {/* Customer Layout Routes */}
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
  path="order-success" 
  element={<OrderSuccess />} 
/>
        <Route path="checkout" element={<Checkout />} />
        <Route 
          path="categories" 
          element={<Categories />} 
        />


        <Route
  path="orders"
  element={<MyOrders />}
/>

<Route
  path="orders/:orderId"
  element={<OrderDetails />}
/>

        {/* Admin Route */}
        <Route
          path="category-management"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CategoryList />
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


        {/* Temporary Order API Testing Route */}
        <Route 
          path="orders-test" 
          element={<OrderTest />} 
        />


      </Route>



      {/* Authentication Routes */}

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