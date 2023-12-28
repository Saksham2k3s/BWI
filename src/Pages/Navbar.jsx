import React from "react";

import { useContext } from "react";
import HooksContext from "../Context/HooksContext";
import { useNavigate, Link } from "react-router-dom";
function Navbar() {
  const route = useNavigate();
  const context = useContext(HooksContext);
  const { mode, toggleMode, setToken, token, cart } = context;
  const handleLogout = () => {
    localStorage.removeItem("token");
      setToken(false)
    route("/");
  };
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg bg-${
          mode ? "light" : "dark"
        }  px-4`}
      >
        <div className="ms-auto">
          <ul className="navbar-nav ms-auto">
            <li className="mode mx-3" onClick={toggleMode} >
              {
             mode ? <img src="https://cdn-icons-png.flaticon.com/128/581/581601.png" alt="moon" />: <img src="https://cdn-icons-png.flaticon.com/128/2698/2698194.png" alt="sun" />
              }
            </li>
            {
              token ? <li className="logout-btn">
              <button onClick={handleLogout}>Logout</button>
              <Link to='/my-cart'> <li type='button' className="btn mycartbtn" >  <i className="fa-solid fa-cart-shopping"></i> My-cart <span className={`${cart.length !== 0 ? 'cart-quantity' : ''}`} >{cart.length !== 0 ? cart.length : ''}</span> </li> </Link>
            </li> : ""
            }
     
          </ul>
   
         

        </div>
      </nav>
    </>
  );
}

export default Navbar;
