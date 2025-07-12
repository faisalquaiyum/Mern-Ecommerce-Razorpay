import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //Login user
  const { email, password } = formData;
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      console.log("Login:", formData);

      toast.success(result.message);

      if (result.success) {
        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-[#1a1a1a] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-[#2a2a2a] p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          Login
        </h2>

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
            className="w-full px-4 py-2 rounded bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10"
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
          Login
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          New user?{" "}
          <Link to="/register" className="text-yellow-400 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
