import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to="/">Home</Link>
      <Link to="/auth">Login</Link>
    </div>
  )
}

export default Navbar
