import React from 'react';
import { assets } from '../assets/assets.js';

const Navbar = () => {
  return (
    <div className="shadow py-4">
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-centre'>
        <img src={assets.logo} alt='Job Portal logo' />
        <button>Recruiter Login</button>
        <button>Login</button>
       </div>
    </div>
  )
}

export default Navbar;