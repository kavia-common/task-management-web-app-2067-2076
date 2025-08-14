import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

// PUBLIC_INTERFACE
export default function App() {
  /**
   * The main application component for the Todo app.
   * Manages todo state, provides handlers for add, edit, delete, and toggle complete,
   * and renders the UI using child components.
   */

  // Initialize todos from localStorage lazily
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem('todos');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('Failed to parse todos from localStorage:', e);
      return [];
    }
  });

  // Persist todos to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (e) {
      console.warn('Failed to save todos to localStorage:', e);
    }
  }, [todos]);

  // Add a new todo
  const addTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text: trimmed,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  // Update an existing todo's text
  const updateTodo = (id, newText) => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
    );
  };

  // Toggle completion state
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="app">
      <div className="app-container">
        <Header />
        <TodoForm onAdd={addTodo} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      </div>
    </div>
  );
}
