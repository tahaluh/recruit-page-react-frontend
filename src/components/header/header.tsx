import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import "./header.scss";
import isLogedService from "../../services/isLogedService";

export default function Header(props: any) {
  const [isLoading, setLoading] = useState(true)
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const verifyLogin = async () => {
      setLogged(await isLogedService.isLoged())
      setLoading(false)
    }

    verifyLogin().catch(console.error)
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

      {(logged && !isLoading) && <Navbar setLogged={setLogged} />}
      {(!logged && !isLoading)  && (
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
