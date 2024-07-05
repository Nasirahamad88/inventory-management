"use client"
import EditProductForm from "@/components/EditProductForm";
import React, { useState, useEffect } from "react";

const getProductById = async (id) => {
  try {
    const res = await fetch(
      `https://inventory-management-gamma.vercel.app/api/products/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const EditProduct = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      const fetchedProduct = await getProductById(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct.product);
      } else {
        setError("Failed to fetch product details.");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const { name, price, brand } = product;

  return (
    <div>
      <EditProductForm id={id} name={name} price={price} brand={brand} />
    </div>
  );
};

export default EditProduct;
