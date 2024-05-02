import React, { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const headers = new Headers();
      headers.append('username', formData.username);
      headers.append('password', formData.password);
  
      const response = await fetch('http://localhost:3000/api/user/users/login', {
        method: 'POST',
        headers: headers
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
  
      // Extract the token from the response JSON
      const responseData = await response.json();
      const token = responseData.token;
  
      // Save the token to localStorage
      localStorage.setItem('token', token);
  
      //console.log('logged in successfully');
    } catch (error) {
      console.error('Error submitting form data:', error.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col container max-w-md mx-auto mt-8 p-20 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-black text-2xl font-bold  mx-auto">SignIn</h1>
      <input
        className="bg-white p-2 m-2 rounded-lg"
        placeholder="Username"
        name='username'
        value={formData.username}
        onChange={handleInputChange}
      ></input>
      <input
        className="bg-white p-2 m-2 rounded-lg"
        placeholder="Password"
        name='password'
        value={formData.password}
        onChange={handleInputChange}
      ></input>
      <button type="submit" className="bg-black text-white p-2 rounded-lg hover:bg-slate-300 hover:text-black max-w-fit mx-auto">
        Submit
      </button>

      <p className="mx-auto">or</p>
      <button className="bg-black text-white p-2 rounded-lg hover:bg-slate-300 hover:text-black ">
        SignIn with Google
      </button>
    </form>
  );
}
