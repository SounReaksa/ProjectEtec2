import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [allProducts, setAllProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const [sortValue, setSortValue] = useState("");

  // Filter State
  const [categoryValue, setCategoryValue] = useState("");
  const [priceValue, setPriceValue] = useState(0);
  const [rateValue, setRateValue] = useState(0);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:3000/products?${sortValue}`);
      if (!res.ok) {
        throw new Error("Failed to fetch product.");
      }
      const data = await res.json();
      setProducts(data);
      setAllProduct(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const filtereProduct = () => {
    const filteredProduct = allProducts?.filter((product) => {
      const categoryMatch =
        !categoryValue || product.category === categoryValue;
      const rateMatch = product.rate >= rateValue;
      const priceMatch =
        priceValue === 0 ||
        (priceValue === 1 && product.price < 50) ||
        (priceValue === 2 && product.price >= 50 && product.price <= 250) ||
        (priceValue === 3 && product.price > 250 && product.price <= 500) ||
        (priceValue === 4 && product.price > 500 && product.price <= 750) ||
        (priceValue === 5 && product.price > 750);
      return categoryMatch && rateMatch && priceMatch;
    });
    setProducts(filteredProduct);
  };

  const userId = localStorage.getItem("id");
  const addToCart = async (id, qty) => {
    const resChecking = await fetch(`http://localhost:3000/carts/${id}`);
    if (resChecking.ok) {
      const data = await resChecking.json();
      const newProductData = { ...data, quantity: data.quantity + qty };

      await fetch(`http://localhost:3000/carts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductData),
      });
    } else {
      // add to cart
      const productToAdd = allProducts.find((pro) => pro.id == id);

      await fetch(`http://localhost:3000/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...productToAdd,
          images: productToAdd.images[0],
          quantity: qty,
          userId
        }),
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [sortValue]);

  useEffect(() => {
    filtereProduct();
  }, [categoryValue, priceValue, rateValue]);

  let categories = [];
  allProducts &&
    allProducts.forEach((pro) => {
      if (!categories.includes(pro.category)) {
        categories.push(pro.category);
      }
    });

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        setSortValue,
        setCategoryValue,
        setRateValue,
        setPriceValue,
        rateValue,
        priceValue,
        addToCart,
        allProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
