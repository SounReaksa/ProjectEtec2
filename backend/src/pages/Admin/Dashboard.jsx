import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col p-5">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/admin/products" className="hover:text-blue-400">Products</Link>
          <Link to="/admin/users" className="hover:text-blue-400">Users</Link>
          <Link to="/admin/orders" className="hover:text-blue-400">Orders</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
