import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

const Checkout = () => {
  const { cart, userAddress, URL, profile, clearCart } = useContext(AppContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const totalPrice = cart?.items?.reduce((acc, item) => acc + item.price, 0);
  const totalQuantity = cart?.items?.reduce((acc, item) => acc + item.qty, 0);

  // handle payment cod & razorpay
  const handlePayment = async () => {
    if (!userAddress) {
      toast.error("Shipping address is missing.");
      return;
    }
    //cod payment
    if (paymentMethod === "cod") {
      try {
        const codOrder = await axios.post(`${URL}/payment/cod`, {
          orderItems: cart?.items,
          userId: profile?._id,
          userShipping: userAddress,
          amount: totalPrice,
        });

        if (codOrder.data.success) {
          clearCart();
          toast.success("Order placed successfully with COD!");
          navigate("/orderconfirmation");
        } else {
          toast.error("Failed to place COD order.");
        }
      } catch (err) {
        console.error("COD Error:", err);
        toast.error("Something went wrong with COD.");
      }

      //razorpay payment
    } else if (paymentMethod === "razorpay") {
      try {
        const orderResponse = await axios.post(`${URL}/payment/checkout`, {
          amount: totalPrice,
          qty: totalQuantity,
          cartItems: cart?.items,
          userShipping: userAddress,
          userId: profile?._id,
        });

        const { order, amount: orderAmount } = orderResponse.data;

        if (!window.Razorpay) {
          toast.error("Razorpay SDK not available.");
          return;
        }

        const options = {
          key: razorpayKey,
          amount: orderAmount,
          currency: "INR",
          name: "Faisal E-Commerce",
          description: "Order Payment",
          order_id: order,
          handler: async function (response) {
            const paymentData = {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              amount: orderAmount,
              orderItems: cart?.items,
              userId: profile._id,
              userShipping: userAddress,
            };

            const api = await axios.post(
              `${URL}/payment/verify-payment`,
              paymentData
            );
            if (api.data.success) {
              clearCart();
              toast.success("Payment successful!");
              navigate("/orderconfirmation");
            } else {
              toast.error("Payment verification failed.");
            }
          },
          prefill: {
            name: userAddress.fullName,
            email: userAddress.email,
            contact: userAddress.phoneNumber,
          },
          notes: {
            address: userAddress.address,
          },
          theme: {
            color: "#facc15",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Payment Error:", error);
        toast.error("Payment failed. Please try again.");
      }
    }
  };

  return (
    <div className="bg-[#1a1a1a] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 border-b border-gray-700 pb-2">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Order Summary */}
          <div className="flex-1 space-y-6">
            <div className="bg-[#2a2a2a] rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">
                Order Summary
              </h2>
              {cart?.items?.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 mb-4 border-b border-gray-700 pb-4"
                >
                  <div className="w-16 h-16 rounded overflow-hidden bg-[#1a1a1a]">
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{item.title}</p>
                    <p className="text-gray-400 text-sm">Qty: {item.qty}</p>
                  </div>
                  <div className="text-yellow-400 font-semibold text-sm sm:text-base">
                    ₹{item.price}
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-sm text-gray-300 mt-4">
                <span>Total Quantity:</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-6 border-t border-gray-600 pt-2">
                <span>Total Price:</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Right: Payment & Address */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Payment on Top */}
            <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">
                Payment Method
              </h2>
              <div className="space-y-2 text-sm text-gray-300">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={paymentMethod === "razorpay"}
                    onChange={() => setPaymentMethod("razorpay")}
                    className="accent-yellow-500"
                  />
                  Pay via Razorpay
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-yellow-500"
                  />
                  Cash on Delivery (COD)
                </label>
              </div>
            </div>

            {/* Address + Pay Button */}
            <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-md h-fit">
              <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">
                Shipping Address
              </h2>
              {userAddress ? (
                <div className="space-y-1 text-sm text-gray-300">
                  <p>
                    <strong>Name:</strong> {userAddress?.fullName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {userAddress?.phoneNumber}
                  </p>
                  <p>
                    <strong>Address:</strong> {userAddress?.address},{" "}
                    {userAddress?.city}, {userAddress?.state},{" "}
                    {userAddress?.country} - {userAddress?.pincode}
                  </p>
                </div>
              ) : (
                <p className="text-red-400">
                  No address found. Please go back and add one.
                </p>
              )}

              <button
                onClick={handlePayment}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
