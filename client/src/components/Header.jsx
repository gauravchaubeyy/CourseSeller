import {Link} from  'react-router-dom';

export default function Header() {
  return (
    <div className='bg-violet-700 flex justify-around p-2'>
      <p className='text-2xl font-bold text-white'>CourseSeller</p>
      <Link to = "/signup">
      <button className='bg-black text-white rounded-lg p-2 hover:bg-slate-50 hover:text-black'>SignUp</button>
      </Link>
    </div>
  )
}
