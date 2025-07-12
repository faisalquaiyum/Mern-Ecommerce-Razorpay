import { useContext } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const { userOrder } = useContext(AppContext);
  const navigate = useNavigate();

  const latestOrder = userOrder?.orders?.[0];

  if (!latestOrder) {
    return <div className="text-center text-white py-20">Loading...</div>;
  }

  const totalQty =
    latestOrder.items?.reduce((sum, item) => sum + item.qty, 0) || 0;
  const totalPrice =
    latestOrder.items?.reduce((sum, item) => sum + item.price, 0) || 0;

  return (
    <div className="bg-[#1a1a1a] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 border-b border-gray-700 pb-2">
          Order Confirmation
        </h1>
        <p className="text-white text-lg mb-6">
          Your order is confirmed & will be delivered soon.
        </p>

        {/* Order Items */}
        <div className="bg-[#2a2a2a] rounded-xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">
            Items in Your Order
          </h2>
          {latestOrder.items?.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 border-b border-gray-700 py-4"
            >
              <img
                src={item.imgSrc}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p className="text-gray-400 text-sm">Qty: {item.qty}</p>
              </div>
              <div className="text-yellow-400 font-semibold">₹{item.price}</div>
            </div>
          ))}

          <div className="flex justify-between mt-4 text-sm text-gray-300">
            <span>Total Quantity:</span>
            <span>{totalQty}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total Price:</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>

        {/* Order + Shipping Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Details */}
          <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">
              Order Details
            </h2>
            <p className="text-sm text-gray-300 mb-1">
              <strong>Order ID:</strong>{" "}
              {latestOrder.razorpay?.orderId || latestOrder._id}
            </p>
            <p className="text-sm text-gray-300 mb-1">
              <strong>Payment ID:</strong>{" "}
              {latestOrder.razorpay?.paymentId || "N/A"}
            </p>
            <p className="text-sm text-gray-300 mb-1">
              <strong>Payment Status:</strong>{" "}
              <span
                className={`${
                  latestOrder.paymentStatus === "Paid"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {latestOrder.paymentStatus || "Pending"}
              </span>
            </p>
            <p className="text-sm text-gray-300 mb-1">
              <strong>Payment Method:</strong>{" "}
              {latestOrder.paymentMethod || "N/A"}
            </p>
            <p className="text-sm text-gray-300">
              <strong>Order Date:</strong>{" "}
              {latestOrder.createdAt
                ? new Date(latestOrder.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </div>

          {/* Shipping Address */}
          <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">
              Shipping Address
            </h2>
            <div className="text-sm text-gray-300 space-y-1">
              {latestOrder.shippingInfo ? (
                <>
                  <p>
                    <strong>Name:</strong> {latestOrder.shippingInfo.fullName}
                  </p>
                  {/* <p>
                    <strong>Email:</strong> {latestOrder.shippingInfo.email || "N/A"}
                  </p> */}
                  <p>
                    <strong>Phone:</strong>{" "}
                    {latestOrder.shippingInfo.phoneNumber}
                  </p>
                  <p>
                    <strong>Address:</strong> {latestOrder.shippingInfo.address}
                    , {latestOrder.shippingInfo.city},{" "}
                    {latestOrder.shippingInfo.state},{" "}
                    {latestOrder.shippingInfo.country || ""} -{" "}
                    {latestOrder.shippingInfo.pincode}
                  </p>
                </>
              ) : (
                <p className="text-gray-400">
                  Shipping information not available.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold"
          >
            Continue Shopping
          </button>
          {/* <button
            onClick={() => navigate("/myorders")}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg border border-gray-600 font-semibold"
          >
            See All Orders
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
