import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  sendCreateAccountRequest,
  sendLoginRequest,
} from "../services/UserService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function LandingScreen({ onLogin }) {
  const navigate = useNavigate();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formSignUpValues, setFormSignUpValues] = useState({
    email: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
  });

  const [formLoginValues, setFormLoginValues] = useState({
    email: "",
    password: "",
  });
  const handleLoginSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  };

  const handleSignupClick = (event) => {
    event.preventDefault(); // Prevents the default behavior of the anchor tag
    setShowSignupModal(true); // Opens the modal
  };

  const handleCloseSignUpModal = () => {
    setShowSignupModal(false); // Closes the modal
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleSignupRequest = () => {
    const { email, password, firstName, middleName, lastName } =
      formSignUpValues;

    sendCreateAccountRequest(email, password, firstName, middleName, lastName)
      .then(
        Swal.fire({
          icon: "success",
          title: "Account Created",
          text: "Your account has been created successfully",
          timer: 5000,
          showConfirmButton: false,
        })
      )
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Account Creation Failed",
          text: "Failed To Create Account",
          timer: 5000,
          showConfirmButton: false,
        });
      });
  };

  const handleSignUpInputChange = (event) => {
    const { name, value } = event.target;
    setFormSignUpValues({ ...formSignUpValues, [name]: value });
  };

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setFormLoginValues({ ...formLoginValues, [name]: value });
  };

  const handleLoginRequest = () => {
    const { email, password } = formLoginValues;
    sendLoginRequest(email, password)
      .then((data) => {
        if (data.message) {
          if (data.message === "Wrong Username or Password") {
            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: "Wrong Username or Password",
              showConfirmButton: false,
              timer: 800,
            });
          } else {
            // Simulating a successful login
            sessionStorage.setItem("isLoggedIn", "true");

            Swal.fire({
              icon: "success",
              title: "Login Successful",
              showConfirmButton: false,
              timer: 1500,
            });

            onLogin();
            navigate("/dashboard");
          }
        } else {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          onLogin();
          sessionStorage.setItem("isLoggedIn", "true");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Wrong Username or Password",
          showConfirmButton: false,
          timer: 800,
        });
      });
  };

  return (
    <div>
      {/* ***** Preloader Start ***** */}
      <div id="preloader">
        <div className="jumper">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {/* ***** Preloader End ***** */}

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
                    <a href="#signup" onClick={handleSignupClick}>
                      Sign Up
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#contact-us" onClick={handleLoginClick}>
                      Login
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
                <a
                  href="#data"
                  className="main-button-slider"
                  onClick={handleSignupClick}
                >
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

      <Modal show={showSignupModal} onHide={handleCloseSignUpModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId="signup-email">
              <Form.Label for="email">Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                value={formSignUpValues.email}
                onChange={handleSignUpInputChange}
              />
            </Form.Group>
            <Form.Group
              controlId="signup-password"
              style={{ marginTop: "15px" }}
            >
              <Form.Label for="password">Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                required
                value={formSignUpValues.password}
                onChange={handleSignUpInputChange}
              />
            </Form.Group>
            <Form.Group
              controlId="signup-firstName"
              style={{ marginTop: "15px" }}
            >
              <Form.Label for="firstName">First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                required
                value={formSignUpValues.firstName}
                onChange={handleSignUpInputChange}
              />
            </Form.Group>
            <Form.Group
              controlId="signup-middleName"
              style={{ marginTop: "15px" }}
            >
              <Form.Label for="middleName">Middle Name:</Form.Label>
              <Form.Control
                type="text"
                name="middleName"
                value={formSignUpValues.middleName}
                onChange={handleSignUpInputChange}
              />
            </Form.Group>
            <Form.Group
              controlId="signup-lastName"
              style={{ marginTop: "15px" }}
            >
              <Form.Label for="lastName">Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                required
                value={formSignUpValues.lastName}
                onChange={handleSignUpInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={handleSignupRequest}
            >
              Sign Up
            </Button>
            <Button variant="secondary" onClick={handleCloseSignUpModal}>
              Close
            </Button>
            {/* Additional buttons or actions */}
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleLoginSubmit}>
          <Modal.Body>
            <Form.Group controlId="signup-email">
              <Form.Label for="email">Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                value={formLoginValues.email}
                onChange={handleLoginInputChange}
              />
            </Form.Group>
            <Form.Group
              controlId="signup-password"
              style={{ marginTop: "15px" }}
            >
              <Form.Label for="password">Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                required
                value={formLoginValues.password}
                onChange={handleLoginInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={handleLoginRequest}
            >
              Login
            </Button>
            <Button variant="secondary" onClick={handleCloseLoginModal}>
              Close
            </Button>
            {/* Additional buttons or actions */}
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default LandingScreen;
