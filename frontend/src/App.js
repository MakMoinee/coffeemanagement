import React, { useEffect, useState } from "react";
import LandingScreen from "./Screens/LandingScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import InventoryScreen from "./Screens/InventoryScreen";
import PosScreen from "./Screens/PosScreen";
import TransactionScreen from "./Screens/TransactionScreen";

function App() {
  const initialLoginStatus = localStorage.getItem("isLoggedIn") === "true"; // Corrected the comparison
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoginStatus);

  // Update localStorage when login status changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <LandingScreen onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <DashboardScreen onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/inventory"
          element={
            isLoggedIn ? (
              <InventoryScreen onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/pos"
          element={
            isLoggedIn ? (
              <PosScreen onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/transactions"
          element={
            isLoggedIn ? (
              <TransactionScreen onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
