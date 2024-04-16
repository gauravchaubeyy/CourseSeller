import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='flex flex-col container max-w-md mx-auto mt-8 p-20 bg-gray-100 rounded-md shadow-md'>
      <h1 className='text-black text-2xl font-bold  mx-auto'>SignUp</h1>
      <input className='bg-white p-2 m-2 rounded-lg' placeholder='Username'></input>
      <input className='bg-white p-2 m-2 rounded-lg' placeholder='Password'></input>
      <button className='bg-black text-white p-2 rounded-lg hover:bg-slate-300 hover:text-black max-w-fit mx-auto'>Submit</button>  
     <Link to="/signin">
      <p className='mx-auto mt-8 ml-8'>Already have an account? signIn</p> 
      </Link>
      <p className='mx-auto'>or</p>
      <button className='bg-black text-white p-2 rounded-lg hover:bg-slate-300 hover:text-black '>SignUp with the google</button>
    </div>
    
  )
}
