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
  FaUserShield,
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
  const cartCount = cart?.items?.length;

  const submitHandler = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      navigate(`/product/search/${encodeURIComponent(query)}`);
      setSearchTerm("");
      setMenuOpen(false); // Close on mobile after search
    }
  };

  //logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // category filter
  const filterByCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category?.toLowerCase() === cat.toLowerCase()
      )
    );
  };
  // Price filter
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

          {/* Search bar */}
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
                  className="relative flex items-center gap-2 w-full hover:text-yellow-400 transition"
                >
                  {/* Wrapper for icon and badge */}
                  <div className="relative">
                    <FaShoppingCart className="text-xl" />

                    {/* Badge */}
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </div>

                  {/* Label */}
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

            {/* <Link
              to="/admin"
              className="flex items-center gap-2 hover:text-yellow-400 transition"
            >
              <FaUserShield /> Admin
            </Link> */}
          </div>

          {/* Hamburger icon */}
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

            <Link
              to="/cart"
              className="relative flex items-center gap-2 w-full hover:text-yellow-400 transition"
            >
              {/* Wrapper for icon and badge */}
              <div className="relative">
                <FaShoppingCart className="text-xl" />

                {/* Badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* Label */}
              <span>Cart</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 w-full hover:text-yellow-400 transition"
            >
              <FaSignInAlt /> Login
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 w-full hover:text-yellow-400 transition"
            >
              <FaUserPlus /> Register
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 w-full hover:text-yellow-400 transition"
            >
              <FaUser /> Profile
            </Link>
            <Link
              to="/logout"
              className="flex items-center gap-2 w-full hover:text-yellow-400 transition"
            >
              <FaSignOutAlt /> Logout
            </Link>
            <Link
              to="/admin"
              className="flex items-center gap-2 w-full hover:text-yellow-400 transition"
            >
              <FaUserShield /> Admin
            </Link>
          </div>
        )}
      </nav>

      {/* Sub Navbar / Filters */}
      {location.pathname == "/" && (
        <div className="bg-[#2a2a2a] text-white px-4 py-2 shadow-sm">
          {/* if to stick sub_nav at top <div className="bg-[#2a2a2a] text-white px-4 py-2 shadow-sm sticky top-[64px] z-40"> */}
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-yellow-400 font-semibold">Category:</span>
              <button
                onClick={() => setFilteredData(products)}
                className="px-3 py-1 rounded bg-gray-700 hover:bg-yellow-500 transition"
              >
                All
              </button>
              <button
                onClick={() => filterByCategory("mobiles")}
                className="px-3 py-1 rounded bg-gray-700 hover:bg-yellow-500 transition"
              >
                Mobiles
              </button>
              <button
                onClick={() => filterByCategory("laptops")}
                className="px-3 py-1 rounded bg-gray-700 hover:bg-yellow-500 transition"
              >
                Laptops
              </button>
              <button
                onClick={() => filterByCategory("cameras")}
                className="px-3 py-1 rounded bg-gray-700 hover:bg-yellow-500 transition"
              >
                Cameras
              </button>
              <button
                onClick={() => filterByCategory("headphones")}
                className="px-3 py-1 rounded bg-gray-700 hover:bg-yellow-500 transition"
              >
                Headphones
              </button>
            </div>

            {/* Price Filters */}
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
                  ₹{price}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
