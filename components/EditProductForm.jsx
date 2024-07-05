"use client"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Product from "@/models/products";
import connectMongoDB from "@/libs/mongodb";
const EditProductForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, );

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await res.json();
      setProduct(data.product);
      setName(data.product.name);
      setPrice(data.product.price);
      setBrand(data.product.brand);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, brand }),
      });
      if (!res.ok) {
        throw new Error("Failed to update product");
      }
      router.push("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
              type="text"
              id="brand"
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="form-input w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await connectMongoDB();
  const product = await Product.findById(params.id).lean();

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

export default EditProductForm;
