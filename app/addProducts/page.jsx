
"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const ProductsList = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const router = useRouter("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !brand) {
      alert("Add all information");
      return;
    }

    try {
      const res = await fetch(
        "https://inventory-management-gamma.vercel.app/api/products",
        // "http://localhost:3000/api/products",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ name, price, brand }),
        }
      );
      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div onSubmit={handleSubmit}>
        <div className="bg-gray-100 flex items-center justify-center h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-6">Add Product</h2>
            <form>
              <div className="form-group mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Product Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  id="name"
                  name="name"
                  className="form-input w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Price
                </label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="number"
                  id="price"
                  name="price"
                  className="form-input w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  htmlFor="brand"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Brand
                </label>
                <input
                  onChange={(e) => setBrand(e.target.value)}
                  value={brand}
                  type="text"
                  id="brand"
                  name="brand"
                  className="form-input w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="btn-submit w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList