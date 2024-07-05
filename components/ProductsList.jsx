import Link from "next/link";
import RemoveBtn from "./RemoveBtn";

const getProduct = async () => {
  try {
    const res = await fetch(
      "http://localhost:3000/api/products",
      // https://inventory-management-gamma.vercel.app
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading products:", error);
    return { products: [] }; // Returning an empty array to handle error gracefully
  }
};

export default async function ProductsList() {
  const { products } = await getProduct();
  console.log(products);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="bg-white shadow sm:rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Product List</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div key={p._id} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-2">{p.name}</h3>
                <p className="text-gray-700 mb-1">Price: ${p.price}</p>
                <p className="text-gray-700">Brand: {p.brand}</p>
                <button className="bg-red-500">
                  <RemoveBtn id={p._id} />
                  <Link href={ `/editProduct/${p._id}`}>Deleted</Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
