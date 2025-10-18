import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductProvider";

const Products = () => {
  const { allProducts } = useContext(ProductContext);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Manage Products</h1>
      <table className="w-full border text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Action</th>
            
          </tr>
        </thead>
        <tbody>
          {allProducts?.map((product,index) => (
            <tr key={product.id}>
              <td className="p-2 border">{product.id}</td>
              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">${product.price}</td>
              <td className="p-2 border">
                <img src={product.images[0]} style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                  borderRadius: '5px'
                }} alt="" />
              </td>
              <td className="p-2 border">
                <button className="px-3 py-1 bg-blue-500 text-white rounded mr-2">Edit</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
