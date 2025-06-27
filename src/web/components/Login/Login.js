import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/Login.scss"; // Import CSS file for styling
import { useDispatch } from "react-redux";
// import { loginSuccess } from "../../../redux/slices/authSlice";
import { loginSuccess } from "../../../redux/slices/authSlice";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });

      const { access, refresh, user } = response.data;

      console.log(refresh, user);

      // Lưu token và thông tin user vào localStorage
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user", JSON.stringify(user));

      //  Cập nhật Redux store
      dispatch(loginSuccess(user));

      // Điều hướng đến trang check role để xác định trang đích phù hợp
      navigate("/check-role");
    } catch (error) {
      alert("Sai tài khoản hoặc mật khẩu!");
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    console.log("Login form is being rendered");
  }, []);

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Nhập email hoặc tên người dùng"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="auth-form-button"
          onClick={handleSubmit}
        >
          Đăng nhập
        </button>
      </form>

      <div className="auth-form-footer">
        <Link to="/forgot-password" className="auth-form-link">
          Quên mật khẩu?
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
