import React from 'react';
import TodoItem from './TodoItem';

/**
 * PUBLIC_INTERFACE
 * TodoList
 * Renders a list of todos or an empty state if none exist.
 *
 * Props:
 * - todos: Array<{ id: string, text: string, completed: boolean }>
 * - onToggle: function(id: string) => void
 * - onDelete: function(id: string) => void
 * - onUpdate: function(id: string, newText: string) => void
 */
export default function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  const hasTodos = todos && todos.length > 0;

  return (
    <section className="section" aria-label="Todo list section">
      <h2 className="section-title">Your tasks</h2>
      <div className="todo-list" role="list">
        {!hasTodos ? (
          <div className="empty" role="status" aria-live="polite">
            No tasks yet. Add your first one above!
          </div>
        ) : (
          todos.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))
        )}
      </div>
    </section>
  );
}
