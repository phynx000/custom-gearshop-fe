import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../web/components/Header/Header";
import Navigation from "../web/components/Header/Navigation";
import Footer from "../web/components/Footer/Footer";
import TokenValidator from "../components/TokenValidator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const WebLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <TokenValidator />

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

      <footer>
        <Footer />
      </footer>

      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default WebLayout;
