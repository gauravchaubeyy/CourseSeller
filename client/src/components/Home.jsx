import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/explore");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-black rounded-lg font-bold text-4xl mt-32 text-white hover:bg-gray-400 hover:text-black"
    >
      Courses
    </button>
  );
}
