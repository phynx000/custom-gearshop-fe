import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/style/Login.scss"; // Import CSS file for styling

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic đăng nhập ở đây
  };

  useEffect(() => {
    console.log("Login form is being rendered");
  }, []);

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
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
          Login
        </button>
      </form>

      <div className="auth-form-footer">
        <Link to="/forgot-password" className="auth-form-link">
          Forgot Password?
        </Link>
        <div className="auth-social-buttons">
          <button className="auth-social-button google-btn">
            Login with Google
          </button>
          <button className="auth-social-button facebook-btn">
            Login with Facebook
          </button>
        </div>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="auth-form-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
