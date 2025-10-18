import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8081/api/admin/products";

const AdminProductForm = ({ product, onSaved, onCancel }) => {
    const [name, setName] = useState("");
    const [imagesText, setImagesText] = useState(""); // comma separated URLs
    const [stockStatus, setStockStatus] = useState("in_stock");
    const [currentPrice, setCurrentPrice] = useState("");
    const [oldPrice, setOldPrice] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (product) {
            setName(product.name || "");
            try {
                const imgs = JSON.parse(product.images || "[]");
                setImagesText(imgs.join(", "));
            } catch (e) {
                setImagesText("");
            }
            setStockStatus(product.stockStatus || "in_stock");
            setCurrentPrice(product.currentPrice ?? "");
            setOldPrice(product.oldPrice ?? "");
            setDiscountPercent(product.discountPercent ?? 0);
            setDescription(product.description || "");
            setColor(product.color || "");
        } else {
            // reset
            setName("");
            setImagesText("");
            setStockStatus("in_stock");
            setCurrentPrice("");
            setOldPrice("");
            setDiscountPercent(0);
            setDescription("");
            setColor("");
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        // build product payload
        const imgsArray = imagesText.split(",").map(i => i.trim()).filter(Boolean);
        const payload = {
            name: name.trim() || "Unnamed Product",
            images: JSON.stringify(imgsArray),
            stockStatus: stockStatus || "in_stock",
            currentPrice: parseFloat(currentPrice) || 0,
            oldPrice: parseFloat(oldPrice) || 0,
            discountPercent: parseInt(discountPercent) || 0,
            description: description || "",
            color: color || ""
        };

        try {
            let res;
            if (product && product.id) {
                res = await axios.put(`${API}/${product.id}`, payload);
            } else {
                res = await axios.post(API, payload);
            }
            onSaved(res.data);
        } catch (err) {
            console.error(err);
            alert("Save failed");
        } finally {
            setSaving(false);
        }
    };






    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm">Name</label>
                    <input required value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" />
                </div>

                <div>
                    <label className="block text-sm">Images (comma separated URLs)</label>
                    <input value={imagesText} onChange={e => setImagesText(e.target.value)} className="w-full border p-2 rounded" />
                </div>

                <div>
                    <label className="block text-sm">Stock Status</label>
                    <select value={stockStatus} onChange={e => setStockStatus(e.target.value)} className="w-full border p-2 rounded">
                        <option value="in_stock">In Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="preorder">Preorder</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm">Color</label>
                    <input value={color} onChange={e => setColor(e.target.value)} className="w-full border p-2 rounded" />
                </div>

                <div>
                    <label className="block text-sm">Current Price</label>
                    <input type="number" step="0.01" value={currentPrice} onChange={e => setCurrentPrice(e.target.value)} className="w-full border p-2 rounded" />
                </div>

                <div>
                    <label className="block text-sm">Old Price</label>
                    <input type="number" step="0.01" value={oldPrice} onChange={e => setOldPrice(e.target.value)} className="w-full border p-2 rounded" />
                </div>

                <div>
                    <label className="block text-sm">Discount %</label>
                    <input type="number" min="0" max="100" value={discountPercent} onChange={e => setDiscountPercent(e.target.value)} className="w-full border p-2 rounded" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm">Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border p-2 rounded" rows="4"></textarea>
                </div>
            </div>

            <div className="mt-3 flex gap-2">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">
                    {saving ? "Saving..." : "Save Product"}
                </button>
            </div>
        </form>
    );
};

export default AdminProductForm;
