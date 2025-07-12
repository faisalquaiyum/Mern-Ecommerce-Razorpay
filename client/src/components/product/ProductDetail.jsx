import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import AppContext from "../../context/AppContext";


const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { addToCart, URL } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${URL}/product/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProduct(api.data.product);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading product details...
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#121212] text-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* Image Section */}
          <div className="flex-1 bg-[#2a2a2a] rounded-xl p-6 flex items-center justify-center">
            <img
              src={product.imgSrc}
              alt={product.title}
              className="max-h-[400px] w-full object-contain"
            />
          </div>

          {/* Details Section */}
          <div className="flex-1 flex items-center justify-center">
            <div className="space-y-6 text-left">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <p className="text-gray-300 text-sm leading-relaxed">
                {product.description}
              </p>
              <h2 className="text-2xl text-blue-400 font-semibold">
                {product.price} ₹
              </h2>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    addToCart(
                      product._id,
                      product.title,
                      product.price,
                      1,
                      product.imgSrc
                    );
                    navigate("/cart");
                  }}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-2 rounded-lg transition"
                >
                  Buy Now
                </button>
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
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2 rounded-lg transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct category={product?.category} />
    </>
  );
};

export default ProductDetail;
