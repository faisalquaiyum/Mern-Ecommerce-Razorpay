import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const { products, filteredData, addToCart } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#121212] p-6">
      {filteredData && filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {filteredData.map((product) => (
            <div
              key={product._id}
              className="w-full max-w-xs bg-[#1e1e1e] text-gray-200 rounded-2xl shadow-lg border border-gray-700 overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <Link
                to={`/product/${product._id}`}
                className="h-48 bg-[#2a2a2a] block"
              >
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                />
              </Link>
              <div className="p-4 flex flex-col gap-3">
                <h2 className="text-md font-semibold line-clamp-2 text-center text-white">
                  {product.title}
                </h2>
                <div className="flex justify-center gap-2 items-center">
                  <span className="text-lg font-bold text-blue-400">
                    {product.price} ₹
                  </span>
                </div>
                <button
                  onClick={() =>
                    addToCart(
                      product._id,
                      product.title,
                      product.price,
                      1,
                      product.imgSrc
                    )
                  }
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-md transition duration-200"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 text-xl mt-20">
          No products available for the selected filters.
        </div>
      )}
    </div>
  );
};

export default ShowProduct;
