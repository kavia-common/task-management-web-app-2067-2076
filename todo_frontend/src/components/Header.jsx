import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Header
 * A minimal header component showing the app title and a subtle subtitle.
 */
export default function Header() {
  return (
    <header className="header" aria-label="Todo application header">
      <div>
        <h1 className="title">
          <span className="dot" aria-hidden="true" />
          Todo
        </h1>
        <p className="subtitle">Create, check, and manage your tasks</p>
      </div>
    </header>
  );
}
