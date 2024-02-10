import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { fetchTransactionsRequest } from "../services/TransactionService";

function TransactionScreen({ onLogout }) {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleLogout = () => {
    sessionStorage.clear();
    sessionStorage.setItem("isLoggedIn", false);
    Swal.fire({
      icon: "success",
      title: "Successfully Logout",
      showConfirmButton: false,
    });
    onLogout();
    window.location.href = "/";
  };

  useEffect(() => {
    fetchTransactionsRequest()
      .then((response) => {
        if (!response.ok) {
          setTransactions([]);
          return;
        }
        return response.json();
      })
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        setTransactions([]);
        return;
      });
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    if (startDate && endDate) {
      return (
        transaction.transaction_date >= startDate &&
        transaction.transaction_date <= endDate
      );
    }
    return true;
  });

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
                      className="active"
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
                <h1 className="display-5 mb-0">Transactions Table</h1>
              </div>
              <div className="table-responsive mb-5">
                <div className="row mb-3">
                  <div className="col">
                  <label for="">From:</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    &nbsp;&nbsp;
                    <label for="">To:</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <table className="table border mb-0" id="sortTable">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      <th className="text-center">Product Name</th>
                      <th>Product Price</th>
                      <th className="text-center">Category</th>
                      <th>Stock</th>
                      <th className="text-center">Registered Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction, index) => (
                      <tr key={index}>
                        <td className="text-center">{transaction.items}</td>
                        <td>{transaction.total}</td>
                        <td className="text-center">{transaction.cash}</td>
                        <td>{transaction.change_amount}</td>
                        <td className="text-center">
                          {transaction.transaction_date}
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
      {/* ***** Footer End ***** */}
    </div>
  );
}

export default TransactionScreen;
