import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const RelatedProduct = ({ category }) => {
  const { products, addToCart } = useContext(AppContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(
      products.filter(
        (data) => data?.category?.toLowerCase() === category?.toLowerCase()
      )
    );
  }, [category, products]);

  return (
    <div className="bg-[#121212] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
          Related Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {relatedProducts?.map((product) => (
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

        {relatedProducts.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            No related products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default RelatedProduct;
