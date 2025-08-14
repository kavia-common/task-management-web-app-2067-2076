import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoItem
 * Displays a single todo with actions to toggle complete, edit text inline, and delete.
 *
 * Props:
 * - todo: { id: string, text: string, completed: boolean }
 * - onToggle: function(id: string) => void
 * - onDelete: function(id: string) => void
 * - onUpdate: function(id: string, newText: string) => void
 */
export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const startEdit = () => {
    setDraft(todo.text);
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(todo.text);
    setEditing(false);
  };

  const saveEdit = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (trimmed !== todo.text) {
      onUpdate(todo.id, trimmed);
    }
    setEditing(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  };

  return (
    <div className="todo-item" role="listitem" aria-live="polite">
      <input
        className="checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as not completed' : 'Mark as completed'}
      />
      {!isEditing ? (
        <>
          <div className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.text}
          </div>
          <div className="actions">
            <button
              className="btn btn-ghost"
              onClick={startEdit}
              aria-label="Edit task"
              title="Edit"
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(todo.id)}
              aria-label="Delete task"
              title="Delete"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <div className="inline-edit" aria-label="Edit task form">
          <input
            className="inline-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKey}
            aria-label="Edit task text"
            autoFocus
          />
          <button
            className="btn btn-accent"
            onClick={saveEdit}
            disabled={!draft.trim()}
            aria-label="Save changes"
            title="Save"
          >
            Save
          </button>
          <button
            className="btn btn-ghost"
            onClick={cancelEdit}
            aria-label="Cancel editing"
            title="Cancel"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
