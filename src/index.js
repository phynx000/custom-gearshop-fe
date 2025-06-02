import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import HomePage from "./components/Home/HomePage";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import LoginForm from "./components/Login/Login";
import SignUpForm from "./components/Login/Signup";
import ProductList from "./components/Product/ProductList";
import ProductDetailPage from "./components/Product/ProductDetailPage";
import Cart from "./components/Cart/Cart";
import store from "./redux/store";
import Checkout from "./components/Checkout/Checkout";
import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import VnpayReturnPage from "./components/Payment/VnpayReturnPage";
import OrderSuccessPage from "./components/OrderSuccess/OrderSuccessPage";
import UserProfile from "./components/UserProfile/UserProfile";
import ContactPage from "./components/Contact/ContactPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:slug" element={<ProductList />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="/payment/vnpay-return" element={<VnpayReturnPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </Provider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
