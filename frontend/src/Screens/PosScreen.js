import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { fetchProductsRequest } from "../services/ProductService";
import { Modal, Button, Form } from "react-bootstrap";
import { sendAddTransactionRequest } from "../services/TransactionService";

function PosScreen({ onLogout }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showTransModal, setTransModal] = useState(false);
  const [transChange, setTransChange] = useState(0.0);
  const [cash, setCash] = useState(0.0);
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

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleCloseTransModal = () => {
    setTransModal(false);
  };

  const reload = () => {
    fetchProductsRequest()
      .then((response) => {
        if (!response.ok) {
          setProducts([]);
          return;
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data from API:", data); // Log the data
        setProducts(data);
      })
      .catch((error) => {
        setProducts([]);
        return;
      });
  };
  const calculateTotal = () => {
    return cart.reduce((total, product) => {
      return total + parseFloat(product.productprice);
    }, 0);
  };

  const checkOut = () => {
    // const productNames = cart.map(
    //   (product) => `${product.productname}: PHP${product.productprice}`
    // );
    // alert(productNames);
    // alert(totalAmount);
    setTransModal(true);
  };

  const handleTransRequest = () => {
    if (transChange > 0) {
      const productNames = cart.map(
        (product) => `${product.productname}: PHP${product.productprice}`
      );
      sendAddTransactionRequest(productNames, totalAmount, cash, transChange)
        .then((response) => {
          if (!response.ok) {
            Swal.fire({
              icon: "error",
              title: "Failed To Create Transaction, Please Try Again Later",
              showConfirmButton: false,
            });
            return;
          }
          return response.json();
        })
        .then((data) => {
          Swal.fire({
            icon: "success",
            title: "Successfully Created Transaction",
            showConfirmButton: false,
          });
          setCart([]);
          setTotalAmount(0);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Failed To Create Transaction, Please Try Again Later",
            showConfirmButton: false,
          });
          return;
        })
        .finally(() => {
          setTransModal(false);
          setCash(0);
          reload();
        });
    } else {
      if (cash >= totalAmount) {
        const balance = cash - totalAmount;
        setTransChange(balance);
        alert("Click Again 'Proceed Transaction' To Continue");
      } else if (totalAmount > cash) {
        alert("Cash is insufficient");
        setCash(0);
      }
    }
  };

  useEffect(() => {
    setTotalAmount(calculateTotal());
  }, [cart]);

  useEffect(() => {
    reload();
  }, []);

  return (
    <div>
      {/* ***** Header Area Start ***** */}
      <header className="header-area background-header">
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
                    <a
                      href="#home"
                      onClick={() => {
                        navigate("/dashboard");
                      }}
                    >
                      Home
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a
                      href="#inventory"
                      className="active"
                      onClick={() => {
                        navigate("/pos");
                      }}
                    >
                      POS
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a
                      href="#inventory"
                      onClick={() => {
                        navigate("/inventory");
                      }}
                    >
                      Inventory
                    </a>
                  </li>
                  
                  <li className="scroll-to-section">
                    <a
                      href="#transactions"
                      onClick={() => {
                        navigate("/transactions");
                      }}
                    >
                      Transactions
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
      <section className="section" id="about2">
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-12">
              <h2>Cart</h2>
              <ul>
                {cart.map((product) => (
                  <li key={product.productid}>
                    {product.productname} - PHP{product.productprice}
                  </li>
                ))}
              </ul>
              <p>Total: PHP{calculateTotal()}</p>
              <button className="btn btn-danger" onClick={() => setCart([])}>
                Clear Cart
              </button>
              <button
                style={{ marginLeft: "10px" }}
                className="btn btn-warning"
                onClick={checkOut}
              >
                Checkout
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h2 className="mb-3">Products</h2>

              <div className="table-responsive mb-5">
                <table className="table border mb-0" id="sortTable">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      <th className="text-center">Product Name</th>
                      <th>Product Price</th>
                      <th className="text-center">Category</th>
                      <th>Stock</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td className="text-center">{product.productname}</td>
                        <td>PHP{product.productprice}</td>
                        <td className="text-center">{product.category}</td>
                        <td>{product.stock}</td>
                        <td className="text-center">
                          <Button
                            variant="primary"
                            className="mr-2"
                            onClick={() => addToCart(product)}
                          >
                            Add To Cart
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
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

      <Modal show={showTransModal} onHide={handleCloseTransModal}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label for="total">Total Amount (PHP):</Form.Label>
            <Form.Control
              readOnly
              type="number"
              name="total"
              value={totalAmount}
            />
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label for="cash">Cash (PHP):</Form.Label>
            <Form.Control
              type="number"
              name="cash"
              onChange={(e) => {
                setCash(e.target.value);
              }}
              value={cash}
            />
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label for="cash">Change:</Form.Label>
            <Form.Control
              readOnly
              type="number"
              name="change"
              value={transChange}
              onChange={setTransChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTransModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleTransRequest}>
            Proceed Transaction
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PosScreen;
