import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WebApp from "../web/WebApp";
import AdminApp from "../admin/AdminApp";
import RoleBasedRedirect from "../components/RoleBasedRedirect";
import AdminProtectedRoute from "../components/AdminProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Role-based redirect route */}
      <Route path="/check-role" element={<RoleBasedRedirect />} />

      {/* Web routes */}
      <Route path="/*" element={<WebApp />} />

      {/* Admin routes - protected */}
      <Route
        path="/admin/*"
        element={
          <AdminProtectedRoute>
            <AdminApp />
          </AdminProtectedRoute>
        }
      />

      {/* Redirect any unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
