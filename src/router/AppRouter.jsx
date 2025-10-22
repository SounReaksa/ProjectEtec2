import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import ProductDetial from "../pages/ProductDetial";

// Admin pages
import Dashboard from "../pages/Admin/Dashboard";
import Products from "../pages/Admin/Products";
import Users from "../pages/Admin/Users";
import Orders from "../pages/Admin/Orders";
import About from "../pages/About";
import Contact from "../pages/Contact";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Product />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products/:id" element={<ProductDetial />} />

      {/* Admin routes */}
      <Route path="/admin" element={<Dashboard />}>
        <Route path="products" element={<Products />} />
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
