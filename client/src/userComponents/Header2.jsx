import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header2() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState('');

 

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername)
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
            <Link to="/profile" className="block px-4 py-2 text-gray-800 font-bold text-2xl hover:bg-gray-200">
            <span>👤</span>{username}
            </Link>
          </li>
          <hr />
          <li>
            <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              Purchased Courses
            </Link>
          </li>
          <li>
  <a
    href="/logout"
    onClick={(event) => {
      event.preventDefault();
      const confirmed = window.confirm("Are you sure you want to log out?");
      if (confirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/signin";
      }
    }}
    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
  >
    Logout
  </a>
</li>

        </ul>
      </div>
    );
  }
}

{/* <span role="img" aria-label="Profile Symbol">👤</span> */}