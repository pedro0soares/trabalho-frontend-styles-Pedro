import React from "react";

const Todo = ({ todo, completeTodo, removeTodo }) => {
  return (
    <div className={`todo ${todo.isCompleted ? "completed" : ""}`}>
      <div className="todo-content">
        <p className="todo-text">{todo.text}</p>
        <p className="todo-category">({todo.category})</p>
      </div>

      <div className="todo-actions-vertical">
        <img
          src="/check.png"
          alt="Completar"
          className="action-btn"
          onClick={() => completeTodo(todo.id)}
        />
        <img
          src="/xis.png"
          alt="Remover"
          className="action-btn"
          onClick={() => removeTodo(todo.id)}
        />
      </div>
    </div>
  );
};

export default Todo;
