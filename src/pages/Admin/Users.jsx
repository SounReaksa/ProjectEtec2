import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Users = () => {
  const { users } = useContext(AuthContext); // You may need to store users in AuthProvider

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Manage Users</h1>
      <table className="w-full border text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">{user?.username}</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
