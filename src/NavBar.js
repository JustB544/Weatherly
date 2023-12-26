import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './NavBar.css';
import NavContext from "./NavContext";
import 'font-awesome/css/font-awesome.min.css';
import SearchModal from "./SearchModal";
import SettingsModal from "./SettingsModal";

function NavBar() {
  const {navContext, setNavContext} = useContext(NavContext);

  return (
    <nav>
      <div className="nav-item">
        <Link to="/"><img src="/Logo.png" alt="Weatherly" className="nav-logo"/></Link>
      </div>
       <div style={{display: "flex", flexDirection: "row"}}>
       <div className="nav-button nav-add" onClick={() => setNavContext(nc => ({...nc, modalType: "add"}))}><i className="fa fa-plus"></i></div>
        <div className="nav-button nav-settings" onClick={() => setNavContext(nc => ({...nc, modalType: "settings"}))}><i className="fa fa-cog"></i></div>
      </div>
      { navContext.modalType === "add" && <SearchModal endModal={() => setNavContext(nc => ({...nc, modalType: null}))}/>}
      { navContext.modalType === "settings" && <SettingsModal endModal={() => setNavContext(nc => ({...nc, modalType: null}))}/>}
    </nav>
  );
}

export default NavBar;