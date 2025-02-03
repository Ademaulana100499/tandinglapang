import React from "react";
import { useDeleteActivity } from "@/hooks/useDeleteActivity";
export const ButtonDeletedActivity = ({ activityData }) => {
   
  const { handleDelete, loading } = useDeleteActivity();
  console.log{activityData}
  return (
    <div>
      <button
        onClick={() => handleDelete(activityData.id)}
        className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-100">
        Hapus Acara Pertandingan {activityData.id}
        {loading && <span>...</span>}
      </button>
    </div>
  );
};
