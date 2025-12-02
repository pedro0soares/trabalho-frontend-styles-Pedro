import React, { useEffect, useState } from 'react';
import Logo from "../components/Logo";
import "../utils/home.css";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [type, setType] = useState('pessoal');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:4000/api/me', {
      headers: { Authorization: token }
    });
    if (res.ok) {
      const d = await res.json();
      setUser(d);
    }
  }

  async function load() {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:4000/api/tasks', {
      headers: { Authorization: token }
    });
    if (res.ok) {
      const data = await res.json();
      setTasks(data);
    } else {
      setTasks([]);
    }
    setLoading(false);
  }

  useEffect(() => { loadUser(); load(); }, []);

  async function add(e) {
    e.preventDefault();
    if (!text) return;

    await fetch('http://localhost:4000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({ title: text, type })
    });

    setText('');
    load();
  }

  async function toggle(id) {
    await fetch(`http://localhost:4000/api/tasks/${id}/toggle`, {
      method: 'PATCH',
      headers: { Authorization: localStorage.getItem('token') }
    });
    load();
  }

  async function del(id) {
    await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: localStorage.getItem('token') }
    });
    load();
  }

  function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

return (
  <>
    <Logo /> {/* ✅ AGORA FICA PRESA NA TELA, IGUAL LOGIN E REGISTER */}

    <div className="outer-container">
      <div className="dashboard">

        <aside className="sidebar">
          <div className="profile">
            <div className="avatar">
              {user ? user.email.charAt(0).toUpperCase() : ''}
            </div>
            <div className="meta">
              <div className="name">{user ? user.email : 'Usuário'}</div>
              <div className="small">Bem vindo</div>
            </div>
          </div>

          <button className="btn-logout" onClick={logout}>
            Sair
          </button>
        </aside>

        <main className="main">
          <div className="container-box">
            <h2>Minhas Tasks</h2>

            <form onSubmit={add} className="add-form">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Nova tarefa"
              />

              <select value={type} onChange={e => setType(e.target.value)}>
                <option value="pessoal">Pessoal</option>
                <option value="trabalho">Trabalho</option>
                <option value="lazer">Lazer</option>
              </select>

              <button>Adicionar</button>
            </form>

            {loading ? (
              <div>Carregando...</div>
            ) : (
              <ul className="tasks">
                {tasks.map(t => (
                  <li key={t.id} className={t.done ? 'done' : ''}>
                    <label>
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => toggle(t.id)}
                      />
                      <span className="title">{t.title}</span>
                      {t.type && <span className="task-type">({t.type})</span>}
                    </label>
                    <button className="del" onClick={() => del(t.id)}>x</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>

      </div>
    </div>
  </>
);

}
