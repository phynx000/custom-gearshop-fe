import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/Home/HomePage";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>

      <div className="main-container">
        <Outlet />
      </div>

      <div className="footer-container"></div>
    </div>
  );
}

export default App;
