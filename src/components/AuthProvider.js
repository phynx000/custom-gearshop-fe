import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { isTokenValid, getCurrentUser, clearAuthData } from "../utils/auth";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user session is valid on app load
    if (isTokenValid()) {
      const user = getCurrentUser();

      if (user) {
        dispatch(loginSuccess(user));
      } else {
        // If we have a token but no user data, clear everything
        clearAuthData();
      }
    }
  }, [dispatch]);

  return children;
};

export default AuthProvider;
