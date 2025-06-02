import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../redux/slices/authSlice";
import {
  isTokenValid,
  getCurrentUser,
  clearAuthData,
  verifyTokenValidity,
} from "../utils/auth";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthValidity = async () => {
      // Check if user session is valid on app load
      if (isTokenValid()) {
        const user = getCurrentUser();

        if (user) {
          // Verify if token is actually valid (not expired)
          const isValid = await verifyTokenValidity();

          if (isValid) {
            dispatch(loginSuccess(user));
          } else {
            // Token is expired, clear auth data and logout
            console.warn("Token expired on app load. Logging out user.");
            clearAuthData();
            dispatch(logout());
          }
        } else {
          // If we have a token but no user data, clear everything
          clearAuthData();
          dispatch(logout());
        }
      }
    };

    checkAuthValidity();
  }, [dispatch]);

  return children;
};

export default AuthProvider;
