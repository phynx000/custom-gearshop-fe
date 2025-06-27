import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/userService";
import "../../../styles/Login.scss";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({
    success: false,
    message: "",
  });

  // Styles for alerts
  const alertStyle = {
    padding: "10px 15px",
    borderRadius: "4px",
    marginBottom: "15px",
    fontSize: "14px",
  };

  const alertSuccessStyle = {
    ...alertStyle,
    backgroundColor: "#d4edda",
    color: "#155724",
    border: "1px solid #c3e6cb",
  };

  const alertDangerStyle = {
    ...alertStyle,
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
  };

  // Spinner style
  const spinnerStyle = {
    display: "inline-block",
    width: "1rem",
    height: "1rem",
    borderRadius: "50%",
    border: "0.2em solid currentColor",
    borderRightColor: "transparent",
    animation: "spin 0.75s linear infinite",
    marginRight: "0.5rem",
    verticalAlign: "text-bottom",
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.username.trim()) {
      newErrors.username = "Username là bắt buộc";
    } else if (formData.username.length < 4) {
      newErrors.username = "Username phải có ít nhất 4 ký tự";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (formData.first_name && formData.first_name.length > 50) {
      newErrors.first_name = "Tên không được quá 50 ký tự";
    }

    if (formData.last_name && formData.last_name.length > 50) {
      newErrors.last_name = "Họ không được quá 50 ký tự";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    } else if (!/(?=.*\d)(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = "Mật khẩu phải có ít nhất một chữ cái và một số";
    }

    // Phone validation if provided
    if (
      formData.phone &&
      !/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))
    ) {
      newErrors.phone = "Phone number must be 10-15 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult({ success: false, message: "" });
    setErrors({});

    if (validateForm()) {
      try {
        // Call the API to register the user
        const response = await registerUser(formData);

        // Handle successful registration
        setSubmitResult({
          success: true,
          message:
            "Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...",
        });

        // Store tokens if returned from API
        if (response.access_token) {
          localStorage.setItem("access_token", response.access_token);

          if (response.refresh_token) {
            localStorage.setItem("refresh_token", response.refresh_token);
          }

          if (response.user) {
            localStorage.setItem("user", JSON.stringify(response.user));
          }

          // Navigate to dashboard or home page
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          // Navigate to login if tokens are not returned
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }

        // Reset form after successful submission
        setFormData({
          username: "",
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
          address: "",
          password: "",
        });
      } catch (error) {
        console.error("Registration error:", error);

        // Handle various API error responses
        if (error.response && error.response.data) {
          const apiErrors = error.response.data;

          // Create an error object based on API responses
          const fieldErrors = {};

          if (typeof apiErrors === "object") {
            // Handle field-specific errors
            Object.keys(apiErrors).forEach((key) => {
              fieldErrors[key] = Array.isArray(apiErrors[key])
                ? apiErrors[key][0]
                : apiErrors[key];
            });

            setErrors(fieldErrors);
          } else {
            // Generic error message
            setSubmitResult({
              success: false,
              message: "Đăng ký thất bại. Vui lòng thử lại.",
            });
          }
        } else {
          setSubmitResult({
            success: false,
            message: "Đăng ký thất bại. Vui lòng thử lại.",
          });
        }
      }
    }

    setIsSubmitting(false);
  };

  const isFormValid = () => {
    return (
      formData.username.trim() &&
      formData.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.password &&
      formData.password.length >= 8 &&
      /(?=.*\d)(?=.*[a-z])/.test(formData.password)
    );
  };

  return (
    <div className="auth-form-container">
      <h2>Đăng ký</h2>

      {/* Display success/error messages */}
      {submitResult.message && (
        <div
          style={submitResult.success ? alertSuccessStyle : alertDangerStyle}
        >
          {submitResult.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Tên người dùng *"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "error" : ""}
          />
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="first_name"
            placeholder="Tên"
            value={formData.first_name}
            onChange={handleChange}
            className={errors.first_name ? "error" : ""}
          />
          {errors.first_name && (
            <span className="error-message">{errors.first_name}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="last_name"
            placeholder="Họ"
            value={formData.last_name}
            onChange={handleChange}
            className={errors.last_name ? "error" : ""}
          />
          {errors.last_name && (
            <span className="error-message">{errors.last_name}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? "error" : ""}
          />
          {errors.address && (
            <span className="error-message">{errors.address}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu *"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <button
          type="submit"
          className="auth-form-button"
          disabled={!isFormValid() || isSubmitting}
        >
          {isSubmitting ? "Đang xử lý đăng ký..." : "Đăng ký"}
        </button>
      </form>

      <div className="auth-form-footer">
        {/* <div className="auth-social-buttons">
          <button className="auth-social-button google-btn">
            Sign up with Google
          </button>
          <button className="auth-social-button facebook-btn">
            Sign up with Facebook
          </button>
        </div> */}
        <p>
          Already have an account?{" "}
          <a href="/login" className="auth-form-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
