import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/user/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.message) {
        alert(data.message);
      } else {
        console.error("Unexpected response format:", data);
        alert("An unexpected error occurred. Please try again later.");
      }
      navigate("/signin");
    } catch (error) {
      console.error("Error submitting form data:", error.message);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col container max-w-md mx-auto mt-40 p-20 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-black text-2xl font-bold  mx-auto">SignUp</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          className="bg-white p-2 m-2 rounded-lg"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        ></input>
        <input
          className="bg-white p-2 m-2 rounded-lg"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        ></input>
        <button
          type="submit"
          className="bg-black text-white p-2 rounded-lg hover:bg-slate-300 hover:text-black"
        >
          Submit
        </button>
      </form>

      <Link to="/signin">
        <p className="mx-auto mt-8 ml-8 text-red-700 hover:underline">
          Already have an account? signIn
        </p>
      </Link>
      <p className="mx-auto">or</p>
      <button
        onClick={SubmitEvent}
        className="bg-black text-white p-2 rounded-lg hover:bg-slate-300 hover:text-black "
      >
        SignUp with the google
      </button>
    </div>
  );
}
