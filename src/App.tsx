import React, { useState } from "react";
import "./styles.css";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

enum Filter {
  All = "all",
  Active = "active",
  Completed = "completed",
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [filter, setFilter] = useState(Filter.All);

  const addTodo = () => {
    if (newTodoText.trim() === "") return;
    const newTodo: Todo = {
      id: todos.length + 1,
      text: newTodoText,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoText("");
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === Filter.Active) {
      return !todo.completed;
    } else if (filter === Filter.Completed) {
      return todo.completed;
    }
    return true;
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ToDo App for Mindbox</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Go to the gym"
          className="flex-grow border border-gray-300 p-2 rounded mr-2"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Add Todo
        </button>
      </div>
      <div className="mb-4">
        <button
          onClick={() => setFilter(Filter.All)}
          className={`mr-2 ${
            filter === Filter.All
              ? "bg-blue-500 text-white hover:bg-blue-700 transition"
              : "bg-gray-300 hover:bg-gray-400 transition"
          } px-4 py-2 rounded`}
        >
          All
        </button>
        <button
          onClick={() => setFilter(Filter.Active)}
          className={`mr-2 ${
            filter === Filter.Active
              ? "bg-blue-500 text-white hover:bg-blue-700 transition"
              : "bg-gray-300 hover:bg-gray-400 transition"
          } px-4 py-2 rounded`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter(Filter.Completed)}
          className={`mr-2 ${
            filter === Filter.Completed
              ? "bg-blue-500 text-white hover:bg-blue-700 transition"
              : "bg-gray-300 hover:bg-gray-400 transition"
          } px-4 py-2 rounded `}
        >
          Completed
        </button>
        <button
          onClick={() => setTodos([])}
          className="mr-2  px-4 py-2 rounded hover:text-red-500 transition "
        >
          Clear All
        </button>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2">Todos</h2>
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="flex items-center mb-2">
              <span
                className={`flex-grow ${todo.completed ? "line-through" : ""}`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => toggleTodo(todo.id)}
                className="text-blue-500 hover:text-blue-600 mr-2"
              >
                {todo.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-800"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
