import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import "../styles.css";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister(e) {
    e.preventDefault();

    const user = { name, email, password };

    const response = await fetch("http://localhost:8080/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (response.ok) navigate("/login");
    else alert("Erro ao registrar usuário");
  }

return (
  <>
    <Logo /> {/* ✅ FORA DO CARD */}

    <div className="page-center">
      <div className="card">

        <h2>Registrar</h2>

        <form onSubmit={handleRegister}>
          <div className="input-wrapper">
            <i>👤</i>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <i>📧</i>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <i>🔒</i>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Registrar</button>
        </form>

        <div className="small">
          Já tem conta? <a href="/login">Entrar</a>
        </div>

      </div>
    </div>
  </>
);

}
