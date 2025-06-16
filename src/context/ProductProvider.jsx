import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [allProducts, setAllProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const [sortValue, setSortValue] = useState("");

  // Filter State
  const [categoryValue, setCategoryValue] = useState("");
  const [priceValue, setPriceValue] = useState(0);
  const [rateValue, setRateValue] = useState(1);

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
      return categoryMatch && rateMatch;
    });
    setProducts(filteredProduct);
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
