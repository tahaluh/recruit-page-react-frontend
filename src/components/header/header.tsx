import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

export default function Header(props: any) {
  return (
    <header className="site-header">
      <div className="logo-div">
        <Link to="/">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
          ></img>
        </Link>
      </div>
      <div className="login-div">
        <Link to="/register">
          <button className="login-button primary-button">Cadastre-se</button>
        </Link>
      </div>
    </header>
  );
}
