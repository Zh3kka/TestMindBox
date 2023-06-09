import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("renders todo app", () => {
  render(<App />);
  const appTitle = screen.getByText(/todo app/i);
  expect(appTitle).toBeInTheDocument();
});

test("adds a new todo", () => {
  render(<App />);
  const inputElement = screen.getByRole("textbox");
  const addButton = screen.getByText(/add todo/i);

  fireEvent.change(inputElement, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  const todoItem = screen.getByText(/new todo/i);
  expect(todoItem).toBeInTheDocument();
});

test("toggles todo status", () => {
  render(<App />);
  const inputElement = screen.getByRole("textbox");
  const addButton = screen.getByText(/add todo/i);
  const todoItem = screen.getByText(/new todo/i);

  fireEvent.change(inputElement, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  expect(todoItem).toHaveStyle("text-decoration: line-through");
});

test("deletes a todo", () => {
  render(<App />);
  const inputElement = screen.getByRole("textbox");
  const addButton = screen.getByText(/add todo/i);
  const todoItem = screen.getByText(/new todo/i);

  fireEvent.change(inputElement, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  expect(todoItem).not.toBeInTheDocument();
});
