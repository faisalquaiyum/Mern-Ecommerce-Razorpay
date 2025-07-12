import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";

const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //Register user
  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    // Client-side validation
    if (!name || !email || !password) {
      return toast.error("Please fill in all fields.");
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address.");
    }

    // Password strength check
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    try {
      const result = await register(name, email, password);
      console.log("Register:", formData);

      toast.success(result.message);

      if (result.success) {
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-[#1a1a1a] px-4">
      <form
        onSubmit={handleRegister}
        className="bg-[#2a2a2a] p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          Register
        </h2>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Name</label>
          <input
            type="text"
            required
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            className="w-full px-4 py-2 rounded bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            required
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            className="w-full px-4 py-2 rounded bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-gray-300 mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            required
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            className="w-full px-4 py-2 pr-10 rounded bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[35px] text-gray-400 hover:text-yellow-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded transition"
        >
          Register
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
