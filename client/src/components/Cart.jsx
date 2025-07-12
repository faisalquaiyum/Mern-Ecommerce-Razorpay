import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let totalQty = 0;
    let totalPrice = 0;
    cart?.items?.forEach((item) => {
      totalQty += item.qty;
      totalPrice += item.price;
    });
    setQty(totalQty);
    setPrice(totalPrice);
  }, [cart]);

  return (
    <div className=" bg-[#1a1a1a] text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 border-b border-gray-700 pb-2">
          Shopping Cart
        </h1>

        {cart?.items?.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="flex-1 space-y-6">
              {cart.items.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col sm:flex-row gap-4 bg-[#2a2a2a] rounded-xl p-4 shadow-md"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-32 overflow-hidden rounded-lg">
                    <img
                      src={product.imgSrc}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {product.title}
                      </h2>
                      <p className="text-sm text-gray-400 mt-1">
                        Price: ₹{product.price / product.qty}
                      </p>
                      <p className="text-sm text-gray-400">
                        Subtotal: ₹{product.price}
                      </p>
                    </div>

                    {/* Quantity and Remove Buttons */}
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => decreaseQty(product.productId, 1)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-2 py-1 rounded"
                      >
                        <FaMinus />
                      </button>
                      <span className="text-lg">{product.qty}</span>
                      <button
                        onClick={() =>
                          addToCart(
                            product?.productId,
                            product.title,
                            product.price / product.qty,
                            1,
                            product.imgSrc
                          )
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-2 py-1 rounded"
                      >
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Are you sure, you want to remove?")) {
                            removeFromCart(product?.productId);
                          }
                        }}
                        className="ml-auto bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white flex items-center gap-2 text-sm"
                      >
                        <FaTrashAlt /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="w-full lg:w-1/3 bg-[#2a2a2a] p-6 rounded-xl shadow-lg h-fit">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">
                Order Summary
              </h2>
              <div className="flex justify-between text-lg mb-3">
                <span>Total Items:</span>
                <span>{qty}</span>
              </div>
              <div className="flex justify-between text-lg mb-3">
                <span>Total Price:</span>
                <span>₹{price.toFixed(2)}</span>
              </div>

              <Link
                to="/shipping"
                className="w-full inline-block text-center bg-green-600 hover:bg-green-700 px-4 py-2 mt-4 rounded font-semibold text-white"
              >
                Proceed to Checkout
              </Link>

              <button
                onClick={() => {
                  if (confirm("Are you sure, you want to clear cart?")) {
                    clearCart();
                  }
                }}
                className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 mt-2 rounded font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center mt-20">
            <h2 className="text-2xl text-gray-400">Your cart is empty</h2>
            <p className="text-sm text-gray-500 mt-2">Start shopping now!</p>

            <Link
              to="/"
              className="inline-block mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded transition duration-200"
            >
              Go to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
