import React from "react";
import { Routes, Route } from "react-router-dom";
import WebLayout from "../layouts/WebLayout";
import HomePage from "./pages/HomePage";
import ProductList from "./components/Product/ProductList";
import ProductDetailPage from "./components/Product/ProductDetailPage";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import ContactPage from "./components/Contact/ContactPage";
import UserProfile from "./components/UserProfile/UserProfile";
import LoginForm from "./components/Login/Login";
import SignUpForm from "./components/Login/Signup";
import VnpayReturnPage from "./components/Payment/VnpayReturnPage";
import OrderSuccessPage from "./components/OrderSuccess/OrderSuccessPage";
import RoleTestPage from "./components/Role/RoleTestPage";
import ProtectedRoute from "../components/ProtectedRoute";

const WebApp = () => {
  return (
    <Routes>
      <Route path="/" element={<WebLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:slug" element={<ProductList />} />
        <Route path="product/:productId" element={<ProductDetailPage />} />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="payment/vnpay-return" element={<VnpayReturnPage />} />
        <Route path="order-success" element={<OrderSuccessPage />} />{" "}
        <Route path="contact" element={<ContactPage />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="role-test"
          element={
            <ProtectedRoute>
              <RoleTestPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="login" element={<LoginForm />} />
      <Route path="signup" element={<SignUpForm />} />
    </Routes>
  );
};

export default WebApp;
