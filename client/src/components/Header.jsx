import { useNavigate, useLocation ,Link} from "react-router-dom";
export default function Header() {
const location = useLocation();
  const showNavbar = location.pathname !== "/signup";
  
  return (
    <div className={showNavbar ? "fixed top-0 left-0 right-0 z-50 flex justify-around items-center gap-10 bg-black  min-h-[80px]" 
                               : "fixed top-0 left-0 right-0 z-50 gap-10 bg-black  min-h-[80px] pt-6 pl-60"}>
    <h1 className="text-2xl font-bold text-red-700">CourseSeller</h1>
  
      {showNavbar && (
        <Link to = "/signup">
        <button
          
          className="hover:bg-red-700 text-red-700 hover:text-white px-4 py-2 rounded-lg shadow-md text-xl border border-red-700"
        >
          SignUp  {/*<span className="ml-2">&#10132;</span> */}
        </button>
        </Link>
      )}
    </div>
  );
  
}


// return (
//   <div className='bg-violet-700 flex justify-around p-2 mx-h-[500px]'>
//     <p className='text-2xl font-bold text-white'>CourseSeller</p>
//     <Link to = "/signup">
//     <button className='bg-black text-white rounded-lg p-2 hover:bg-slate-50 hover:text-black'>SignUp</button>
//     </Link>
//   </div>
// )