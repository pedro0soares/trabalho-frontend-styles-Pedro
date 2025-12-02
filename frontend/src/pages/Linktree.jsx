import React from "react";
import "../utils/team.css";
import Logo from "../components/Logo";

export default function Team() {
  return (
    <div className="team-page">
      <Logo />

      <div className="team-box">
        <h1>Equipe ToDo Delivery</h1>
        <p>Conheça nossos GitHub’s:</p>

        <div className="links">
          <a href="https://github.com/cauacysneiros" target="_blank">Cauã Cysneiros</a>
          <a href="https://github.com/GabriellaSantanar" target="_blank">Gabriella Santana</a>
          <a href="https://github.com/danndnts" target="_blank">Daniel</a>
          <a href="https://github.com/iguioz" target="_blank">Igor</a>
          <a href="https://github.com/pedro0soares" target="_blank">Pedro Soares</a>
        </div>
      </div>
    </div>
  );
}
