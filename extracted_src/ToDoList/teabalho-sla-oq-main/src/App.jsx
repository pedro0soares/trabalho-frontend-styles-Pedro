import { useState } from 'react';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "criar funcionalidade x no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir pra academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    },
  ]);

  // Adicionar nova tarefa
  const addTodo = (text, category) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
      },
    ];
    setTodos(newTodos);
  };

  // Concluir tarefa
  const completeTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: true } : todo
    );
    setTodos(newTodos);
    window.alert("🎉 Parabéns, não fez mais que a obrigação!");
  };

  // Remover tarefa com confirmação
  const removeTodo = (id) => {
    const confirmDelete = window.confirm("Tem certeza de que quer apagar essa tarefa?");
    if (confirmDelete) {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    }
  };

  return (
    <div className="background-container">
      {/* Logo clicável */}
      <a
        href="https://www.americanas.com.br"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/Personal planner (4).png"
          alt="Logo"
          className="corner-image"
        />
      </a>

      {/* Caixa principal */}
      <div className="app">
        <h1>Lista de Tarefas</h1>

        <div className="todo-list">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          ))}
        </div>

        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
