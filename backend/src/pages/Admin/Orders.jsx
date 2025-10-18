import React from "react";

const Orders = () => {
  const orders = [
    { id: 1, user: "John Doe", total: 250, status: "Pending" },
    { id: 2, user: "Jane Smith", total: 120, status: "Completed" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Manage Orders</h1>
      <table className="w-full border text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="p-2 border">{order.id}</td>
              <td className="p-2 border">{order.user}</td>
              <td className="p-2 border">${order.total}</td>
              <td className="p-2 border">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
