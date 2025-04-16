import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import HomePage from "./components/Home/HomePage";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/Login/Login";
import SignUpForm from "./components/Login/Signup";
import ProductList from "./components/Product/ProductList";
import ProductDetailPage from "./components/Product/ProductDetailPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:slug" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Route>

      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
    </Routes>
  </BrowserRouter>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
