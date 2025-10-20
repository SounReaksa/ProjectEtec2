// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthProvider";
// import { CartContext } from "../context/CartProvider";
// import { ProductContext } from "../context/ProductProvider";
// import Dropdownn from "../components/Dropdown.jsx";
// import Logo from "../assets/logo/logo.png";

// const Navbar = () => {
//   const { isAuthenticated, logout, user } = useContext(AuthContext); // user info added
//   const { totalItems } = useContext(CartContext);
//   const { handleSearch } = useContext(ProductContext);
//   const [searchInput, setSearchInput] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const login = (userData) => {
//     setUser(userData);
//     setIsAuthenticated(true);
//   };

//   const Logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchInput.trim()) {
//       handleSearch(searchInput.trim());
//       navigate("/products");
//     }
//   };

//   return (
//     <nav className="sticky top-0 bg-white z-50 shadow-sm border-b border-gray-100">
//       <div className="max-w-[1300px] mx-auto flex items-center justify-between px-6 py-3">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2">
//           <img
//             src={Logo}
//             alt="Logo"
//             className="h-[80px] w-auto object-contain transition-transform duration-300 hover:scale-105"
//           />
//         </Link>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex items-center gap-6">
//           {["Home", "Shop", "Products", "About", "Contact"].map((item) => {
//             const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
//             return (
//               <li key={item}>
//                 <Link
//                   to={path}
//                   className="text-[15px] text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 relative group"
//                 >
//                   {item}
//                   <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//         {/* <ul className="flex gap-4 sm:hidden">
//           <li>
//             <Link
//               to="/"
//               className="text-sm text-gray-700 hover:text-blue-600 px-2 py-3"
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/shop"
//               className="text-sm text-gray-700 hover:text-blue-600 px-2 py-3"
//             >
//               Shop
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/products"
//               className="text-sm text-gray-700 hover:text-blue-600 px-2 py-3"
//             >
//               Products
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/about"
//               className="text-sm text-gray-700 hover:text-blue-600 px-2 py-3"
//             >
//               About
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/contact"
//               className="text-sm text-gray-700 hover:text-blue-600 px-2 py-3"
//             >
//               Contact
//             </Link>
//           </li>
//         </ul> */}

//         {/* Search & Icons */}
//         <div className="hidden md:flex items-center gap-4">
//           <form onSubmit={handleSearchSubmit}>
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition w-[220px]"
//             />
//           </form>

//           {isAuthenticated ? (
//             <>
//               {/* Cart Icon */}
//               <Link to="/cart" className="relative hover:text-blue-600 transition">
//                 <i className="bx bx-cart text-2xl text-gray-700"></i>
//                 {totalItems > 0 && (
//                   <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-[10px] px-[6px] py-[1px] rounded-full">
//                     {totalItems}
//                   </span>
//                 )}
//               </Link>

//               {/* User Name or Icon */}
//               <div className="flex items-center gap-2 relative">
//                 <i className="bx bx-user text-2xl text-gray-700"></i>
//                 <span className="text-gray-700 font-medium">{user?.name || "User"}</span>
//               </div>

//               {/* Dropdown menu */}
//               <Dropdownn />

//               {/* Logout Button */}
//               <button onClick={logout} className="hover:text-blue-600 transition">
//                 <i className="bx bx-log-out text-2xl text-gray-700"></i>
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-gray-700 text-3xl"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <i className={`bx ${menuOpen ? "bx-x" : "bx-menu"}`}></i>
//         </button>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-200 shadow-inner">
//           <ul className="flex flex-col items-center py-4 space-y-3">
//             {["Home", "Shop", "Products", "About", "Contact"].map((item) => (
//               <li key={item}>
//                 <Link
//                   to={`/${item.toLowerCase()}`}
//                   className="block text-gray-700 text-[16px] hover:text-blue-600 transition"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {item}
//                 </Link>
//               </li>
//             ))}
//             <form
//               onSubmit={handleSearchSubmit}
//               className="w-[90%] flex justify-center"
//             >
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//                 className="border border-gray-300 rounded-full px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </form>

//             {/* Mobile Auth Buttons */}
//             {isAuthenticated ? (
//               <>
//                 <button>
//                   <i className="bx bx-heart text-gray-700 text-xl"></i>
//                 </button>
//                 <Link to={"/cart"} className="relative">
//                   <i className="bx bx-cart text-gray-700 text-xl"></i>
//                   <span className="absolute top-[-2px] right-[-4px] bg-gray-900 text-white text-[10px] rounded-full px-[5px]">
//                     {totalItems}
//                   </span>
//                 </Link>
//                 <Dropdownn />
//                 <button onClick={logout}>
//                   <i className="bx bx-log-out text-gray-700 text-xl"></i>
//                 </button>
//               </>
//             ) : (
//               <div className="flex flex-col items-center gap-3 mt-3">
//                 <Link
//                   to="/login"
//                   className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
//                 >
//                   Register
//                 </Link>
//               </div>
//             )}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { CartContext } from "../context/CartProvider";
import { ProductContext } from "../context/ProductProvider";
import Dropdownn from "../components/Dropdown.jsx";
import Logo from "../assets/logo/logo.png";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);
  const { handleSearch } = useContext(ProductContext);
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      handleSearch(searchInput.trism());
      navigate("/products");
    }
  };

  return (
    <nav className="sticky top-0 bg-white z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-[1300px] mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="Logo"
            className="h-[80px] w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          {["Home", "Products", "About", "Contact"].map((item) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            return (
              <li key={item}>
                <Link
                  to={path}
                  className="text-[15px] text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Search & Icons */}
        <div className="hidden md:flex items-center gap-4">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition w-[220px]"
            />
          </form>

          {isAuthenticated ? (
            <>
              {/*  Cart Icon */}
              <Link to="/cart" className="relative hover:text-blue-600 transition">
                <i className="bx bx-cart text-2xl text-gray-700"></i>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-[10px] px-[6px] py-[1px] rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/*  User Icon + Dropdown */}
              <div className="relative flex items-center gap-2">
                {/* <i className="bx bx-user text-2xl text-gray-700"></i> */}
                {/* <span className="text-gray-700 font-medium">
                  {user?.email || "User"}
                </span> */}
                <Dropdownn />
              </div>

              {/*  Logout */}
              <button onClick={logout} className="hover:text-blue-600 transition">
                <i className="bx bx-log-out text-2xl text-gray-700"></i>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

