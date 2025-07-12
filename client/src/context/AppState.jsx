import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AppState = (props) => {
  const URL = import.meta.env.VITE_URL_API;

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token")
  );
  const [filteredData, setFilteredData] = useState([]);
  const [profile, setProfile] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userOrder, setUserOrder] = useState([]);

  // show product at dashboard
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${URL}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data.products);
      setProducts(api.data.products);
      setFilteredData(api.data.products);
    };
    fetchProduct();
    userCart();
    getAddress();
    userNewOrder();
  }, [token, reload]);

  //for token fetch & profile management
  useEffect(() => {
    if (token) {
      userProfile();
      setIsAuthenticated(true);
    }
  }, [token]);

  //register user
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${URL}/user/register`,
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    return api.data;
    // alert(api.data.message);
    // console.log("User register", api);
  };

  //Login user
  const login = async (email, password) => {
    const api = await axios.post(
      `${URL}/user/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    setToken(api.data.token);
    setIsAuthenticated(true);
    localStorage.setItem("token", api.data.token);
    // console.log("User login", api.data);
    return api.data;
  };

  //logout user
  const logout = () => {
    try {
      setIsAuthenticated(false);
      setToken("");
      localStorage.removeItem("token");
      toast.success("Logout successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  //user profile
  const userProfile = async () => {
    const api = await axios.get(`${URL}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log("User Profile",api.data.user);
    setProfile(api.data.user);
  };

  // add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    try {
      const api = await axios.post(
        `${URL}/cart/add`,
        { productId, title, price, qty, imgSrc },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setReload(!reload);
      toast.success(api.data.message);
    } catch (err) {
      console.error("Add to cart error:", err);
      const errorMessage =
        err?.response?.data?.message || "You must be logged in to add to cart";
      toast.error(errorMessage);
    }
  };

  //get user cart
  const userCart = async () => {
    const api = await axios.get(`${URL}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log("User cart", api.data.cart);
    setCart(api.data.cart);
  };

  // decrease qty-- of cart item
  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(
      `${URL}/cart/--qty`,
      {
        productId,
        qty,
      },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(api.data.message);
  };

  // remove item from cart
  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${URL}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    toast.success(api.data.message);
  };

  // clear cart all items
  const clearCart = async () => {
    const api = await axios.delete(`${URL}/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    toast.success(api.data.message);
  };

  // shipping address
  const shippingAddress = async (
    fullName,
    country,
    state,
    city,
    pincode,
    phoneNumber,
    address
  ) => {
    try {
      const api = await axios.post(
        `${URL}/address/add`,
        { fullName, country, state, city, pincode, phoneNumber, address },
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setReload(!reload);
      toast.success(api.data.message);
      return api.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // get user latest address
  const getAddress = async () => {
    const api = await axios.get(`${URL}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //console.log("Previous address", api.data.userAddress);
    setUserAddress(api.data.userAddress);
  };

  // get user latest order
  const userNewOrder = async () => {
    const api = await axios.get(`${URL}/payment/userorder`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    console.log("User order", api.data);
    setUserOrder(api.data);
  };

  return (
    <AppContext
      value={{
        products,
        register,
        login,
        URL,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filteredData,
        setFilteredData,
        logout,
        userProfile,
        profile,
        addToCart,
        userCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
        shippingAddress,
        userAddress,
        userOrder,
      }}
    >
      {props.children}
    </AppContext>
  );
};

export default AppState;
