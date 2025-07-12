import React, { useContext, useState } from "react";
import {
  FaShoppingBag,
  FaShoppingCart,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);
  const cartCount = cart?.items?.length || 0;

  const submitHandler = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      navigate(`/product/search/${encodeURIComponent(query)}`);
      setSearchTerm("");
      setMenuOpen(false); // Close mobile menu
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const filterByCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category?.toLowerCase() === cat.toLowerCase()
      )
    );
  };

  const filterByPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price));
  };

  return (
    <>
      <nav className="bg-[#1a1a1a] text-white shadow-md px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition"
          >
            <FaShoppingBag className="text-3xl" />
            E-Commerce
          </Link>

          {/* Search Bar (Desktop) */}
          <form
            className="hidden sm:flex flex-1 justify-center px-4"
            onSubmit={submitHandler}
          >
            <div className="relative w-full max-w-md">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search products"
                className="w-full pl-10 pr-4 py-2 rounded-md bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <HiOutlineSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
            </div>
          </form>

          {/* Desktop Links */}
          <div className="hidden sm:flex gap-4 items-center text-sm">
            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="relative flex items-center gap-2 hover:text-yellow-400 transition"
                >
                  <div className="relative">
                    <FaShoppingCart className="text-xl" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span>Cart</span>
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:text-yellow-400 transition"
                >
                  <FaUser /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:text-yellow-400 transition"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 hover:text-yellow-400 transition"
                >
                  <FaSignInAlt /> Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 hover:text-yellow-400 transition"
                >
                  <FaUserPlus /> Register
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button
            className="sm:hidden text-xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden mt-4 space-y-3 px-2 pb-4">
            <form onSubmit={submitHandler} className="relative">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search products"
                className="w-full pl-10 pr-4 py-2 rounded-md bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <HiOutlineSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
            </form>

            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="relative flex items-center gap-2 hover:text-yellow-400 transition"
                >
                  <div className="relative">
                    <FaShoppingCart className="text-xl" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span>Cart</span>
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:text-yellow-400 transition"
                >
                  <FaUser /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:text-yellow-400 transition w-full text-left"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 hover:text-yellow-400 transition"
                >
                  <FaSignInAlt /> Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 hover:text-yellow-400 transition"
                >
                  <FaUserPlus /> Register
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Subnavbar for Filters (Home page only) */}
      {location.pathname === "/" && (
        <div className="bg-[#2a2a2a] text-white px-4 py-3 shadow-sm">
          <div className="max-w-7xl mx-auto">
            {/* Mobile Accordion for Categories */}
            <div className="sm:hidden mb-3">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-yellow-400 font-semibold">
                    Categories
                  </span>
                  <FaChevronDown className="text-xs transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilteredData(products)}
                    className="px-3 py-1.5 text-sm rounded bg-gray-700 hover:bg-yellow-500 transition"
                  >
                    All
                  </button>
                  {["mobiles", "laptops", "cameras", "headphones"].map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => filterByCategory(cat)}
                        className="px-3 py-1.5 text-sm rounded bg-gray-700 hover:bg-yellow-500 transition capitalize"
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>
              </details>
            </div>

            {/* Mobile Accordion for Price Filters */}
            <div className="sm:hidden">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-yellow-400 font-semibold">
                    Price Filters
                  </span>
                  <FaChevronDown className="text-xs transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[15999, 25999, 49999, 69999, 89999].map((price) => (
                    <button
                      key={price}
                      onClick={() => filterByPrice(price)}
                      className="px-3 py-1.5 text-sm rounded bg-gray-700 hover:bg-yellow-500 transition"
                    >
                      ₹{price.toLocaleString()}
                    </button>
                  ))}
                </div>
              </details>
            </div>

            {/* Desktop View (unchanged) */}
            <div className="hidden sm:flex sm:flex-row sm:justify-between gap-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-yellow-400 font-semibold">Category:</span>
                <button
                  onClick={() => setFilteredData(products)}
                  className="px-3 py-1 rounded bg-gray-700 hover:bg-yellow-500 transition"
                >
                  All
                </button>
                {["mobiles", "laptops", "cameras", "headphones"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => filterByCategory(cat)}
                    className="px-3 py-1 rounded bg-gray-700 hover:bg-yellow-500 transition capitalize"
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-yellow-400 font-semibold">
                  Price above:
                </span>
                {[15999, 25999, 49999, 69999, 89999].map((price) => (
                  <button
                    key={price}
                    onClick={() => filterByPrice(price)}
                    className="px-3 py-1 rounded bg-gray-700 hover:bg-yellow-500 transition"
                  >
                    ₹{price.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
