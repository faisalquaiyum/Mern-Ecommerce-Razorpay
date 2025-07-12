import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // save address
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, country, state, city, pincode, phoneNumber, address } =
      form;
    //client-side validation
    if (
      !fullName ||
      !country ||
      !state ||
      !city ||
      !pincode ||
      !phoneNumber ||
      !address
    ) {
      return toast.error("Please fill out all fields.");
    }

    if (String(pincode).length !== 6) {
      return toast.error("Pincode must be 6 digits.");
    }

    if (String(phoneNumber).length !== 10) {
      return toast.error("Phone number must be 10 digits.");
    }

    //If validation passes, submit the address
    const result = await shippingAddress(
      fullName,
      country,
      state,
      city,
      pincode,
      phoneNumber,
      address
    );

    if (result?.success) {
      navigate("/checkout");
      setForm({
        fullName: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        phoneNumber: "",
        address: "",
      });
    }
  };

  const useOldAddress = () => {
    // console.log("Using old address");
    navigate("/checkout");
  };

  return (
    <div className="bg-[#1a1a1a] text-white px-4 py-10">
      <div className="max-w-2xl mx-auto bg-[#2a2a2a] p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 border-b border-gray-700 pb-2">
          Shipping Address
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-yellow-500"
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-yellow-500"
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-yellow-500"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-yellow-500"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-yellow-500"
              required
            />
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-yellow-500"
              required
            />
          </div>
          <textarea
            name="address"
            placeholder="Nearby Landmark / Address"
            value={form.address}
            onChange={handleChange}
            className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-yellow-500"
            rows="3"
            required
          ></textarea>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded"
            >
              Submit
            </button>
            {userAddress && (
              <button
                type="button"
                onClick={useOldAddress}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded"
              >
                Use Old Address
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Address;
