import React, { useState } from "react";
import "../../assets/style/Login.scss";
const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic quên mật khẩu ở đây
  };

  return (
    <div className="auth-form-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="auth-form-button">
          Reset Password
        </button>
      </form>

      <p>
        Remembered your password?{" "}
        <a href="/login" className="auth-form-link">
          Login
        </a>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
