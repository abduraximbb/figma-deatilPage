import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { request } from "../../api";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request
      .get(`/product/get/${id}`)
      .then((res) => {
        if (res.data) {
          setData(res.data);
        } else {
          navigate("/not-found");
        }
      })
      .catch(() => navigate("/not-found"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-700 font-semibold">
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Mahsulot Rasmi */}
        <div className="relative flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
          <img
            src={data?.image || "https://via.placeholder.com/400"}
            alt={data?.name || "Mahsulot rasmi"}
            className="rounded-lg max-h-[400px] object-contain"
          />
          <div className="absolute top-4 right-4">
            <button
              className={`text-3xl ${
                data?.isInWishlist
                  ? "text-red-500"
                  : "text-gray-400 hover:text-red-500"
              }`}
              title="Sevimlilarga qo‘shish"
            >
              {data?.isInWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>

        {/* Mahsulot Tafsilotlari */}
        <div className="p-6">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
            {data?.name}
          </h1>
          <p className="text-gray-500 mb-6 leading-relaxed">
            {data?.description}
          </p>

          <div className="flex items-center justify-between mb-6">
            <span className="text-3xl font-bold text-blue-600">
              ${data?.price}
            </span>
          </div>

          {/* Quantity controller */}
          <div className="flex items-center mb-6">
            <button
              className="w-10 h-10 flex items-center justify-center text-white bg-blue-500 rounded-full hover:bg-blue-600"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="mx-4 text-gray-800 font-semibold">{quantity}</span>
            <button
              className="w-10 h-10 flex items-center justify-center text-white bg-blue-500 rounded-full hover:bg-blue-600"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <button className="w-full py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition mb-4 text-lg font-semibold">
            Savatga qo‘shish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
