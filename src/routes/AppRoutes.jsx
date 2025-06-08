import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WebApp from "../web/WebApp";
// import AdminApp from "../admin/AdminApp";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Web routes */}
      <Route path="/*" element={<WebApp />} />

      {/* Admin routes */}
      {/* <Route path="/admin/*" element={<AdminApp />} /> */}

      {/* Redirect any unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
