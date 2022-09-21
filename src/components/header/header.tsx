import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import "./header.scss";

export default function Header(props: any) {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    setLogged(localStorage.getItem("TOKEN") ? true : false);
  }, []);

  return (
    <header className="site-header">
      <div className="logo-div">
        <button onClick={() => {console.log(localStorage.getItem("TOKEN"))}}>testa</button>
        <Link to="/">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
          ></img>
        </Link>
      </div>

      {logged && <Navbar setLogged={setLogged} />}
      {!logged && (
        <div className="login-div">
          <Link to="/login">
            <button className="login-button primary-button">Login</button>
          </Link>
          <Link to="/register">
            <button className="login-button primary-button">Cadastre-se</button>
          </Link>
        </div>
      )}
    </header>
  );
}
