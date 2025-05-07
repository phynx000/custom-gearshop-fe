import React, { useState } from "react";
import "../../assets/style/Login.scss";

const SignUpForm = () => {
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

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      // Log the form data (replace with actual API call)
      console.log("Form submitted:", formData);

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
    }

    setIsSubmitting(false);
  };

  const isFormValid = () => {
    return (
      formData.username.trim() &&
      formData.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.password
    );
  };

  return (
    <div className="auth-form-container">
      <h2>Đăng ký</h2>
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
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="last_name"
            placeholder="Họ"
            value={formData.last_name}
            onChange={handleChange}
          />
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
          />
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
        <div className="auth-social-buttons">
          <button className="auth-social-button google-btn">
            Sign up with Google
          </button>
          <button className="auth-social-button facebook-btn">
            Sign up with Facebook
          </button>
        </div>
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
