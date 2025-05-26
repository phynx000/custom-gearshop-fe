import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/Header/Header";
import Navigation from "./components/Header/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/Home/HomePage";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <div className="container-fluid px-lg-5">
          <Header />
        </div>
        <div className="container-fluid p-0">
          <Navigation />
        </div>
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid px-lg-4 py-3">
          <Outlet />
        </div>
      </main>

      <footer className="bg-light py-4 mt-auto">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="mb-0">© 2023 Gear Shop - All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
