import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductProvider";

const Product = () => {
  const { categories } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (cate) => {
    if (selectedCategory === cate) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(cate);
    }
  };

  return (
    <div className="bg-slate-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-4 gap-5 py-8">
          <div className="col-span-1">
            <div className="bg-white p-2 px-3 rounded-lg shadow-md border">
              <h2 className="flex items-center gap-2 text-[16px] text-gray-700">
                <i className="bx bx-filter-alt"></i> Filter
              </h2>
              <div className="mt-5">
                <p className="text-sm font-medium mb-3">Category</p>
                <div className="flex flex-col gap-1">
                  {categories.map((cate) => (
                    <div key={cate} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-3 h-3 checked:bg-black"
                        onChange={() => handleChange(cate)}
                        checked={cate == selectedCategory}
                        id={cate}
                        name="category"
                      />
                      <label htmlFor={cate} className="font-medium text-sm">
                        {cate}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-blue-400"></div>
        </div>
      </div>
    </div>
  );
};

export default Product;
