import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { verifyTokenValidity, clearAuthData } from "../utils/auth";

const TokenValidator = () => {
  const [showExpiredMessage, setShowExpiredMessage] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId;

    const checkTokenValidity = async () => {
      if (isAuthenticated) {
        const isValid = await verifyTokenValidity();

        if (!isValid) {
          console.warn("Token has expired during session. Logging out user.");
          setShowExpiredMessage(true);

          // Clear auth data and logout
          clearAuthData();
          dispatch(logout());

          // Hide message after 5 seconds
          setTimeout(() => {
            setShowExpiredMessage(false);
          }, 5000);
        }
      }
    };

    // Listen for auth events from apiClient
    const handleAuthLogout = (event) => {
      dispatch(logout());
      if (event.detail?.reason === "token_expired") {
        setShowExpiredMessage(true);
        setTimeout(() => {
          setShowExpiredMessage(false);
        }, 5000);
      }
    };

    const handleShowExpiredMessage = () => {
      setShowExpiredMessage(true);
      setTimeout(() => {
        setShowExpiredMessage(false);
      }, 5000);
    };

    // Add event listeners
    window.addEventListener("auth:logout", handleAuthLogout);
    window.addEventListener(
      "auth:show-expired-message",
      handleShowExpiredMessage
    );

    if (isAuthenticated) {
      // Check token validity every 5 minutes
      intervalId = setInterval(checkTokenValidity, 5 * 60 * 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      window.removeEventListener("auth:logout", handleAuthLogout);
      window.removeEventListener(
        "auth:show-expired-message",
        handleShowExpiredMessage
      );
    };
  }, [isAuthenticated, dispatch]);

  if (!showExpiredMessage) {
    return null;
  }

  return (
    <Alert
      variant="warning"
      dismissible
      onClose={() => setShowExpiredMessage(false)}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        minWidth: "300px",
      }}
    >
      <Alert.Heading>Phiên đăng nhập đã hết hạn</Alert.Heading>
      <p>
        Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại để tiếp tục
        sử dụng.
      </p>
    </Alert>
  );
};

export default TokenValidator;
