import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import {
  sendAddProductRequest,
  fetchProductsRequest,
  deleteProductsRequest,
  sendUpdateProductRequest,
} from "../services/ProductService";

function InventoryScreen({ onLogout }) {
  const navigate = useNavigate();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [formAddProductValues, setFormAddProductValues] = useState({
    productName: "",
    productPrice: 0.0,
    category: "",
    stock: 0,
  });
  const [formUpdateProductValues, setFormUpdateProductValues] = useState({
    productname: "",
    productprice: 0.0,
    category: "",
    stock: 0,
  });

  const [products, setProducts] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [updateIndex, setUpdateIndex] = useState(null);

  const handleAddProductInputChange = (event) => {
    const { name, value } = event.target;
    setFormAddProductValues({ ...formAddProductValues, [name]: value });
  };

  const handleUpdateProductInputChange = (event) => {
    const { name, value } = event.target;
    setFormUpdateProductValues({ ...formUpdateProductValues, [name]: value });
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
  };

  const handleUpdateClick = (index) => {
    setUpdateIndex(index);
    setFormUpdateProductValues(products[index]);
  };

  const handleUpdateConfirm = () => {
    // Add your delete logic here
    const { productname, productprice, category, stock } =
      formUpdateProductValues;
    const id = products[updateIndex].productid;
    sendUpdateProductRequest(id, productname, productprice, category, stock)
      .then((response) => {
        if (!response.ok) {
          Swal.fire({
            icon: "error",
            title: "Failed To Update Product",
            showConfirmButton: false,
            timer: 800,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Successfully Updated Product",
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed To Update Product",
          showConfirmButton: false,
          timer: 800,
        });
      })
      .finally(() => {
        // Close the modal after deletion
        setUpdateIndex(null);
        reload();
      });
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

  const handleDeleteConfirm = () => {
    // Add your delete logic here

    console.log("Deleting product at index:", deleteIndex);
    const id = products[deleteIndex].productid;
    deleteProductsRequest(id)
      .then((response) => {
        if (!response.ok) {
          Swal.fire({
            icon: "error",
            title: "Failed To Delete Product",
            showConfirmButton: false,
            timer: 800,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Successfully Deleted Product",
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed To Delete Product",
          showConfirmButton: false,
          timer: 800,
        });
      })
      .finally(() => {
        // Close the modal after deletion
        setDeleteIndex(null);
        reload();
      });
  };

  const handleCloseModal = () => {
    setDeleteIndex(null);
  };

  const handleAddProductClick = (event) => {
    event.preventDefault();
    setShowAddProductModal(true);
  };

  const handleAddProductSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  };

  const handleCloseAddProductModal = () => {
    setShowAddProductModal(false);
  };

  const handleCloseUpdateProductModal = () => {
    setUpdateIndex(null);
  };

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

  const handleAddProductRequest = () => {
    const { productName, productPrice, category, stock } = formAddProductValues;
    sendAddProductRequest(productName, productPrice, category, stock)
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Successfully Added Product",
          showConfirmButton: false,
        });
        fetchProductsRequest()
          .then((response) => {
            if (!response.ok) {
              setShowAddProductModal(false);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Data from API:", data); // Log the data
            setProducts(data);
            setShowAddProductModal(false);
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
            throw error;
          });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed Operation",
          text: "Failed To Add Product, Please Try Again Later",
          showConfirmButton: false,
          timer: 800,
        });
      });
  };

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
                      href="#pos"
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
                      className="active"
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
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title mb-2">
                <h1 className="display-5 mb-0">Products Table</h1>
              </div>
              <div className="section-title mb-2">
                <Button variant="primary" onClick={handleAddProductClick}>
                  Add Product
                </Button>
              </div>
              <div className="table-responsive mb-5">
                <table className="table border mb-0" id="sortTable">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      <th className="text-center">Product Name</th>
                      <th>Product Price</th>
                      <th className="text-center">Category</th>
                      <th>Stock</th>
                      <th className="text-center">Registered Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td className="text-center">{product.productname}</td>
                        <td>{product.productprice}</td>
                        <td className="text-center">{product.category}</td>
                        <td>{product.stock}</td>
                        <td className="text-center">{product.created_at}</td>
                        <td>
                          <Button
                            variant="primary"
                            className="mr-2"
                            onClick={() => handleUpdateClick(index)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteClick(index)}
                          >
                            Delete
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

      <Modal show={showAddProductModal} onHide={handleCloseAddProductModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddProductSubmit}>
          <Modal.Body>
            <Form.Group controlId="signup-productName">
              <Form.Label for="productName">Product Name:</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                required
                value={formAddProductValues.productName}
                onChange={handleAddProductInputChange}
              />
            </Form.Group>
            <Form.Group controlId="signup-price" style={{ marginTop: "15px" }}>
              <Form.Label for="productPrice">Product Price:</Form.Label>
              <Form.Control
                type="number"
                name="productPrice"
                required
                value={formAddProductValues.productPrice}
                onChange={handleAddProductInputChange}
              />
            </Form.Group>

            <Form.Group
              controlId="signup-category"
              style={{ marginTop: "15px" }}
            >
              <Form.Label for="category">Category:</Form.Label>
              <Form.Control
                type="text"
                name="category"
                required
                value={formAddProductValues.category}
                onChange={handleAddProductInputChange}
              />
            </Form.Group>

            <Form.Group controlId="signup-stock" style={{ marginTop: "15px" }}>
              <Form.Label for="stock">Stock:</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                required
                value={formAddProductValues.stock}
                onChange={handleAddProductInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={handleAddProductRequest}
            >
              Proceed Adding
            </Button>
            <Button variant="secondary" onClick={handleCloseAddProductModal}>
              Close
            </Button>
            {/* Additional buttons or actions */}
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={updateIndex != null} onHide={handleCloseUpdateProductModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddProductSubmit}>
          <Modal.Body>
            <Form.Group controlId="signup-productName">
              <Form.Label for="productName">Product Name:</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                required
                value={formUpdateProductValues.productname}
                onChange={handleUpdateProductInputChange}
              />
            </Form.Group>
            <Form.Group controlId="signup-price" style={{ marginTop: "15px" }}>
              <Form.Label for="productPrice">Product Price:</Form.Label>
              <Form.Control
                type="number"
                name="productPrice"
                required
                value={formUpdateProductValues.productprice}
                onChange={handleUpdateProductInputChange}
              />
            </Form.Group>

            <Form.Group
              controlId="signup-category"
              style={{ marginTop: "15px" }}
            >
              <Form.Label for="category">Category:</Form.Label>
              <Form.Control
                type="text"
                name="category"
                required
                value={formUpdateProductValues.category}
                onChange={handleUpdateProductInputChange}
              />
            </Form.Group>

            <Form.Group controlId="signup-stock" style={{ marginTop: "15px" }}>
              <Form.Label for="stock">Stock:</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                required
                value={formUpdateProductValues.stock}
                onChange={handleUpdateProductInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={handleUpdateConfirm}
            >
              Proceed Updating
            </Button>
            <Button variant="secondary" onClick={handleCloseUpdateProductModal}>
              Close
            </Button>
            {/* Additional buttons or actions */}
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={deleteIndex !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ***** Footer End ***** */}
    </div>
  );
}

export default InventoryScreen;
