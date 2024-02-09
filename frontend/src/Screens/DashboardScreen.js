import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function DashboardScreen({ onLogout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    sessionStorage.setItem("isLoggedIn", false);
    // onLogout();
    Swal.fire({
      icon: "success",
      title: "Successfully Logout",
      showConfirmButton: false,
    });
    onLogout();
    window.location.href = "/";
  };

  const openInventory = () => {
    navigate("/inventory");
  };
  return (
    <div>
      {/* ***** Header Area Start ***** */}
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* ***** Logo Start ***** */}
                <a href="/" className="logo">
                  CoffeeMan
                </a>
                {/* ***** Logo End ***** */}
                {/* ***** Menu Start ***** */}
                <ul className="nav">
                  <li className="scroll-to-section">
                    <a href="/" className="active">
                      Home
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="/">POS</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#inventory" onClick={openInventory}>
                      Inventory
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#contact-us" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
                {/* ***** Menu End ***** */}
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* ***** Header Area End ***** */}

      {/* ***** Welcome Area Start ***** */}
      <div className="welcome-area" id="welcome">
        {/* ***** Header Text Start ***** */}
        <div className="header-text">
          <div className="container">
            <div className="row">
              <div
                className="left-text col-lg-6 col-md-6 col-sm-12 col-xs-12"
                data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
              >
                <h2>
                  Brew, Track, and Thrive with <strong>CofeeMan</strong>
                </h2>
                <p>
                  Elevate your coffee business to new heights with CofeeMan's
                  intuitive features and robust performance. Start your journey
                  towards efficiency and excellence today!
                </p>
                <a href="#data" className="main-button-slider">
                  Sign Up
                </a>
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                data-scroll-reveal="enter right move 30px over 0.6s after 0.4s"
              >
                <img
                  src="assets/images/slider-icon.png"
                  className="rounded img-fluid d-block mx-auto"
                  alt="First Vector Graphic"
                />
              </div>
            </div>
          </div>
        </div>
        {/* ***** Header Text End ***** */}
      </div>
      {/* ***** Welcome Area End ***** */}
      {/* ***** Features Big Item End ***** */}

      {/* ***** Footer Start ***** */}
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 col-sm-12">
              <p className="copyright">
                Copyright &copy; 2024 CoffeMan Company
              </p>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12">
              <ul className="social">
                <li>
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-rss"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-dribbble"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      {/* ***** Footer End ***** */}
    </div>
  );
}

export default DashboardScreen;
