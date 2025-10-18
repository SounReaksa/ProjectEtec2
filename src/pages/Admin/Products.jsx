import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminProductForm from "../../components/AdminProductForm";

const API = "http://localhost:8081/api/admin/products";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API);
      setAllProducts(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      setAllProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowFormModal(true);
  };

  const handleCreateClick = () => {
    setEditingProduct(null);
    setShowFormModal(true);
  };

  const handleFormSaved = (savedProduct) => {
    setAllProducts(prev => {
      const exists = prev.some(p => p.id === savedProduct.id);
      if (exists) return prev.map(p => p.id === savedProduct.id ? savedProduct : p);
      return [savedProduct, ...prev];
    });
    setShowFormModal(false);
    setEditingProduct(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <div>
          <button
            onClick={handleCreateClick}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Product
          </button>
          <button
            onClick={fetchProducts}
            className="ml-2 px-4 py-2 bg-gray-300 rounded"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Current</th>
              <th className="p-2 border">Old</th>
              <th className="p-2 border">Discount</th>
              <th className="p-2 border">Color</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {allProducts?.map((product) => {
              let imgs = [];
              try { imgs = JSON.parse(product.images || "[]"); } catch (e) {}
              return (
                <tr key={product.id}>
                  <td className="p-2 border">{product.id}</td>
                  <td className="p-2 border">
                    {imgs[0] ? (
                      <img
                        src={imgs[0]}
                        alt=""
                        style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 5 }}
                      />
                    ) : (
                      <div className="w-[50px] h-[50px] bg-gray-100 flex items-center justify-center text-xs">No image</div>
                    )}
                  </td>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.stockStatus}</td>
                  <td className="p-2 border">${product.currentPrice?.toFixed(2)}</td>
                  <td className="p-2 border">${product.oldPrice?.toFixed(2)}</td>
                  <td className="p-2 border">{product.discountPercent}%</td>
                  <td className="p-2 border">{product.color}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Modal Form */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowFormModal(false)}
            >
              ✕
            </button>
            <AdminProductForm
              product={editingProduct}
              onCancel={() => setShowFormModal(false)}
              onSaved={handleFormSaved}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
