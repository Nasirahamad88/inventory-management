"use client";

import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(
        `https://inventory-management-gamma.vercel.app/api/products?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      <p >DELETE</p>
    </button>
  );
}
