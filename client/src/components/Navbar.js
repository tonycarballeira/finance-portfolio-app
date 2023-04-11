import React from 'react'
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const [cookies, setCookies] = useCookies(["access_token"]);  
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className='navbar__wrapper'>
      <div className='navbar__logo'>
        <Link to="/">Home</Link>
      </div>

      <div className='navbar__search'>
        <div className='navbar__searchContainer'>

        </div>
      </div>
      
      {!cookies.access_token ? (<Link to="/auth">Login</Link>) : <button onClick={logout}>Logout</button>}
      
    </div>
  )
}

export default Navbar
