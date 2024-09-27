import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSection, setSelectedSection] = useState('All'); // State to track the selected section
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const addTodo = ({ title, description, dueDate, priority }) => {
    const newTodo = {
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
      isCompleted: false,
    };
    setTodos([newTodo, ...todos]);
    setShowForm(false);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, updatedTodo) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  // Filter todos based on the selected section and search term
  const filteredTodos = () => {
    return todos
      .filter((todo) => {
        const titleMatch = todo.title.toLowerCase().includes(searchTerm.toLowerCase());
        switch (selectedSection) {
          case 'Low':
            return titleMatch && todo.priority === 'Low';
          case 'Medium':
            return titleMatch && todo.priority === 'Medium';
          case 'High':
            return titleMatch && todo.priority === 'High';
          case 'Done':
            return titleMatch && todo.isCompleted;
          default: // 'All'
            return titleMatch;
        }
      });
  };

  return (
    <div className="app">
      <h1 className="text-center text-3xl font-bold mb-4">Todo Manager</h1>
      <div className="container mx-auto">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </button>

        {/* Search Input */}
        <div className="mb-4 text-center">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-1/2"
          />
        </div>

        {/* Section Buttons */}
        <div className="mb-4 text-center">
          {['All', 'Low', 'Medium', 'High', 'Done'].map(section => (
            <button
              key={section}
              className={`mr-2 px-4 py-2 rounded ${selectedSection === section ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedSection(section)}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Show form when "Add Task" button is clicked */}
        {showForm && <TodoForm addTodo={addTodo} />}

        {/* Task list */}
        <TodoList
          todos={filteredTodos()} // Pass filtered todos to TodoList
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      </div>
    </div>
  );
}

export default App;
