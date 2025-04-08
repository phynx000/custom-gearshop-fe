import React, { useState } from "react";
import "../../assets/style/Login.scss";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic đăng ký ở đây
  };

  return (
    <div className="auth-form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-form-button">
          Sign Up
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
