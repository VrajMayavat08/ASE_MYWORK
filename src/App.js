import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

// Authentication components
import LoginGeneral from "./components/LoginGeneral";
import LoginAdmin from "./components/LoginAdmin";
import SignUpGeneral from "./components/SignUpGeneral";

// User components
import UserDashboard from "./components/UserDashboard";
import UserLostItemsView from "./components/UserLostItemsView";
import UserFoodMenu from "./components/FoodVendor/UserFoodMenu";


// Admin components
import AdminDashboard from "./components/AdminDashboard";
import AdminLostItemForm from "./components/AdminLostItemForm";
import AdminLostItemsView from "./components/AdminLostItemsView";
import AdminClaimsView from "./components/AdminClaimsView";
import AdminUnclaimedItemsView from "./components/AdminUnclaimedItemsView";
import AdminFoodForm from "./components/FoodVendor/AdminFoodForm";
import LoginScreen from "./components/LoginScreen";

const App = () => {
  return (
    <AuthProvider>  {/* Wrap your entire app with AuthProvider */}
      <Router>
        <Routes>
          {/* Authentication */}
          <Route path="/" element={<LoginScreen/>} />
          <Route path="/login-general" element={<LoginGeneral />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/signup-general" element={<SignUpGeneral />} />

          {/* User Routes */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user-lost-items-view" element={<UserLostItemsView />} />
          <Route path="/user-food-menu" element={<UserFoodMenu />} />


          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-lost-item-form" element={<AdminLostItemForm />} />
          <Route path="/admin-lost-items-view" element={<AdminLostItemsView />} />
          
          <Route path="/admin-food-form" element={<AdminFoodForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
