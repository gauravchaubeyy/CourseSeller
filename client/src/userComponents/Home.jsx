import React from 'react'
import {useNavigate} from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();
const handleClick=()=>{
  navigate("/signup")
}

  return (
    <div className="min-h-[600px] relative">
     
        <div className="overlay absolute top-0 left-0 w-full h-full "></div>

        <img src="https://miro.medium.com/max/1400/1*a0Ve4jk_XRvWkC_SS1S79w.jpeg" alt="" className="w-full h-screen " />

        <div className="absolute top-1/2 left-40 z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-red-700">
            Shape Your Career:
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-red-700">
            Explore Free Courses
          </h1>

          <button onClick={handleClick}
            className="hover:bg-red-700 text-red-700 hover:text-white px-4 py-2 
          rounded-lg shadow-md text-xl mt-4 border border-red-700"
          >
            Register <span className="ml-2">&#10132;</span>
          </button>
        </div>
      </div>
  )
}

export default Home


































































