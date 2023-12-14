import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './NavBar.css';
import NavContext from "./NavContext";
import 'font-awesome/css/font-awesome.min.css';

function NavBar() {
  const {navContext, setNavContext} = useContext(NavContext);

  return (
    <nav>
      <div className="nav-item">
        <Link to="/">Weatherly</Link>
      </div>
      {navContext.home && <div style={{display: "flex", flexDirection: "row"}}>
        <div className="nav-button nav-add" onClick={() => setNavContext(nc => ({...nc, modalType: "add"}))}><i className="fa fa-plus"></i></div>
        <div className="nav-button nav-settings" onClick={() => setNavContext(nc => ({...nc, modalType: "settings"}))}><i className="fa fa-wrench"></i></div>
      </div>}
    </nav>
  );
}

export default NavBar;