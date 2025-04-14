import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/Header/Header";
import Navigation from "./components/Header/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/Home/HomePage";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <div>
        <div className="header-container">
          <Header />
        </div>
        <div className="navigation-container">
          <Navigation />
        </div>
      </div>

      <div className="main-container">
        <Outlet />
      </div>

      <div className="footer-container"></div>
    </div>
  );
}

export default App;
