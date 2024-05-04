import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header2() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-around items-center gap-10 bg-black min-h-[80px]">
      <h1 className="text-2xl font-bold text-red-700">CourseSeller</h1>
      <div className='relative'>
        <button
          onClick={toggleDropdown}
          className="hover:bg-red-700 text-red-700 hover:text-white px-4 py-2 rounded-lg shadow-md text-xl border border-red-700"
        >
          Profile
        </button>
        {showDropdown && renderDropdown()}
      </div>
    </div>
  );

  function renderDropdown() {
    return (
      <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-md">
        <ul className="py-1">
          <li>
            <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              User Name {/* Replace with actual user name */}
            </Link>
          </li>
          <li>
            <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              Purchased Courses
            </Link>
          </li>
          <li>
            <Link to="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

