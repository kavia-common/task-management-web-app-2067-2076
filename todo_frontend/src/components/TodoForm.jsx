import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoForm
 * A controlled form for creating new todos.
 *
 * Props:
 * - onAdd: function(text: string) => void  // called with the new todo text
 */
export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} aria-label="Add todo form">
      <input
        className="input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        aria-label="New task"
      />
      <button
        className="btn btn-primary"
        type="submit"
        disabled={!text.trim()}
        aria-label="Add task"
        title="Add task"
      >
        Add
      </button>
    </form>
  );
}
