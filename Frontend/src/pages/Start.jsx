import { Link } from "react-router-dom";
import llog from "../assets/Uber-Logo.png";
import Bg from "../assets/start.jpg";


const Start =() => {
  return (
    <div>
      <div className="bg-cover bg-center h-screen pt-8 flex justify-between flex-col w-full"
  style={{ backgroundImage: `url(${Bg})` }}
>
        <img
          className="w-18 h-16 ml-8"
          src={llog}
          alt="Uber Logo"
        />
        <div className='py-4 px-4 bg-white'>
          <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
          <Link to='/login' className='text-white py-3 rounded w-full bg-black mt-4 flex items-center justify-center'>
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Start
