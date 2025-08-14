import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders header and input for adding todos', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /todo/i });
  expect(heading).toBeInTheDocument();

  const input = screen.getByPlaceholderText(/add a new task/i);
  expect(input).toBeInTheDocument();
});

test('can add a todo', async () => {
  const user = userEvent.setup();
  render(<App />);

  const input = screen.getByPlaceholderText(/add a new task/i);
  const addBtn = screen.getByRole('button', { name: /add/i });

  await user.type(input, 'Write tests');
  await user.click(addBtn);

  expect(screen.getByText(/write tests/i)).toBeInTheDocument();
});

test('can toggle, edit, and delete a todo', async () => {
  const user = userEvent.setup();
  render(<App />);

  // Add a todo first
  const input = screen.getByPlaceholderText(/add a new task/i);
  const addBtn = screen.getByRole('button', { name: /add/i });
  await user.type(input, 'Sample task');
  await user.click(addBtn);

  const todoText = screen.getByText(/sample task/i);
  expect(todoText).toBeInTheDocument();

  // Toggle complete
  const checkbox = screen.getByRole('checkbox');
  await user.click(checkbox);
  expect(checkbox).toBeChecked();

  // Edit
  const editBtn = screen.getByRole('button', { name: /edit/i });
  await user.click(editBtn);
  const editInput = screen.getByLabelText(/edit task text/i);
  await user.clear(editInput);
  await user.type(editInput, 'Updated task');
  const saveBtn = screen.getByRole('button', { name: /save/i });
  await user.click(saveBtn);
  expect(screen.getByText(/updated task/i)).toBeInTheDocument();

  // Delete
  const deleteBtn = screen.getByRole('button', { name: /delete/i });
  await user.click(deleteBtn);

  expect(screen.queryByText(/updated task/i)).not.toBeInTheDocument();
});
