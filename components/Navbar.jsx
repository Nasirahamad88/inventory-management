import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="flex justify-center items-center bg-stone-500 p-4 shadow-md">
      <h2 className="text-blue-500 mx-4 font-semibold cursor-pointer hover:text-blue-700">
        <Link href="/addProducts">Home</Link>
      </h2>
      <h2 className="mx-4 font-semibold">
        <Link href="/addProducts">
          <div className="text-blue-500 hover:text-blue-700">Add Products</div>
        </Link>
      </h2>
    </div>
  );
};

export default Navbar