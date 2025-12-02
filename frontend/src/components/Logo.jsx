import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/Personal planner (4).png";
import "../utils/logo.css";

export default function Logo() {
  const navigate = useNavigate();

  function abrirLinktree() {
    navigate("/Linktree");
  }

  return (
    <img
      src={logo}
      className="site-logo"
      alt="Logo"
      onClick={abrirLinktree}
      style={{ cursor: "pointer" }}
    />
  );
}
