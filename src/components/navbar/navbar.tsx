import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";

export default function Navbar(props: any) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <NavItem icon={faUser}>
          <DropdownMenu setLogged={props.setLogged}></DropdownMenu>
        </NavItem>
      </ul>
    </nav>
  );
}

const NavItem = (props: any) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={props.icon} />
      </a>
      {open && props.children}
    </li>
  );
};

const DropdownMenu = (props: any) => {
  const navigate = useNavigate();
  const DropdownItem = (props: any) => {
    return (
      <Link className="menu-item" to={props.linkPath}>
        {props.children}
      </Link>
    );
  };
  return (
    <div className="dropdown">
    <DropdownItem linkPath="/profile">Perfil</DropdownItem>
      <DropdownItem linkPath="/company">Empresa</DropdownItem>
      <a
        className="menu-item"
        onClick={() => {
          localStorage.removeItem("TOKEN");
          props.setLogged(false);
          navigate("/");
        }}
      >
        Logout
      </a>
    </div>
  );
};
