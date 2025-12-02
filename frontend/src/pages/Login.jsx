import React, { useState } from "react";
import Logo from "../components/Logo";

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  function validEmail(e) {
    return /\S+@\S+\.\S+/.test(e);
  }

  async function submit(e) {
    e.preventDefault();
    setErr('');

    if (!validEmail(email)) return setErr('Email inválido');
    if (!pass) return setErr('Senha necessária');

    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/home';
      } else setErr(data.message || 'erro');

    } catch {
      setErr('Unable to connect to backend');
    }
  }

return (
  <>
    <Logo /> {/* ✅ FORA DE TUDO – AGORA PRENDE NA TELA */}

    <div className="page-center">
      <div className="card slide-up">

        <h2>Login</h2>

        <form onSubmit={submit}>
          <div className="input-wrapper">
            <i>📧</i>
            <input
              placeholder="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <i>🔒</i>
            <input
              placeholder="password"
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>

          <button>Entrar</button>
        </form>

        {err && <div className="err">{err}</div>}

        <div className="small">
          Não possui login? <a href="/register">Registre-se</a>
        </div>

      </div>
    </div>
  </>
);

}
