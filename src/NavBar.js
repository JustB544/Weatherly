import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './NavBar.css';

function NavBar() {

  return (
    <nav>
      <div className="nav-item">
        <Link to="/">Weatherly</Link>
      </div>
      {/* <div style={{display: "flex", flexDirection: "row"}}>
        <div className="nav-item"><Link to='/login'>Login</Link></div>
        <div className="nav-item"><Link to='/signup'>Sign up</Link></div>
      </div> */}
    </nav>
  );
}

export default NavBar;