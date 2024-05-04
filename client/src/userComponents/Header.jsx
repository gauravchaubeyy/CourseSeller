import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-around items-center gap-10 bg-black min-h-[80px]">
      <h1 className="text-2xl font-bold text-red-700">CourseSeller</h1>
      <Link to="/signup">
        <button
          className="hover:bg-red-700 text-red-700 hover:text-white px-4 py-2 rounded-lg shadow-md text-xl border border-red-700"
        >
          SignUp
        </button>
      </Link>
    </div>
  );
}


