import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../assests/logo.png";
import camera from "../assests/camera.png";
const Header: React.FC = () => {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/ ">
          <img src={logo} alt="InstaRocket" style={{ height: 50 }} />
        </Link>

        <Link to="/new">
          <img src={camera} alt="Camera" style={{ height: 50 }} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
