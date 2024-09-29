import { useReducer, useState, useEffect, useRef } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

// Initial state and reducer function for managing todo tasks
const initialState = {
  todos: [],
  selectedSection: 'All',
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [action.payload, ...state.todos] };
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, isCompleted: !todo.isCompleted } : todo
        ),
      };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload.updatedTodo } : todo
        ),
      };
    case 'SET_SECTION':
      return { ...state, selectedSection: action.payload };
    case 'SORT_BY_DATE':
      { const sortedTodos = [...state.todos].sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return action.payload === 'asc' ? dateA - dateB : dateB - dateA;
      });
      return { ...state, todos: sortedTodos }; }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [showForm, setShowForm] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // New state for dark mode
  const [dateSort, setDateSort] = useState(''); // State for sorting by date
  const [showDateOptions, setShowDateOptions] = useState(false); // State to control the dropdown

  const dropdownRef = useRef(null); // To close dropdown on click outside

  const addTodo = ({ title, description, dueDate, priority }) => {
    const newTodo = {
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
      isCompleted: false,
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
    setShowForm(false);
  };

  const toggleComplete = (id) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const editTodo = (id, updatedTodo) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, updatedTodo } });
  };

  // Filter todos based on the selected section
  const filteredTodos = () => {
    switch (state.selectedSection) {
      case 'Low':
        return state.todos.filter((todo) => todo.priority === 'Low');
      case 'Medium':
        return state.todos.filter((todo) => todo.priority === 'Medium');
      case 'High':
        return state.todos.filter((todo) => todo.priority === 'High');
      case 'Done':
        return state.todos.filter((todo) => todo.isCompleted);
      default:
        return state.todos;
    }
  };

  const handleSortByDate = (sortType) => {
    setDateSort(sortType);
    dispatch({ type: 'SORT_BY_DATE', payload: sortType });
    setShowDateOptions(false); // Close the dropdown after selection
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDateOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`app min-h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-100 to-indigo-200'}`}>
      <h1 className={`text-center text-4xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Todo Manager</h1>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`mb-4 px-4 py-2 rounded-lg transition duration-300 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-600 text-white'}`}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Main Container */}
      <div className={`container mx-auto max-w-4xl w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-lg p-8`}>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mb-4`}
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </button>

        {/* Section Buttons */}
        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {['All', 'Low', 'Medium', 'High', 'Done'].map((section) => (
            <button
              key={section}
              className={`px-4 py-2 rounded-lg text-sm ${state.selectedSection === section ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} transition duration-300`}
              onClick={() => dispatch({ type: 'SET_SECTION', payload: section })}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Filter by Date Button with dropdown */}
        <div className="relative mb-6" ref={dropdownRef}>
          <button
            onClick={() => setShowDateOptions(!showDateOptions)}
            className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition duration-300"
          >
            Filter by Date
          </button>
          {showDateOptions && (
            <div className="absolute mt-2 bg-white shadow-lg rounded-lg w-48 z-10">
              <button
                onClick={() => handleSortByDate('asc')}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
              >
                Oldest First
              </button>
              <button
                onClick={() => handleSortByDate('desc')}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
              >
                Newest First
              </button>
            </div>
          )}
        </div>

        {/* Show form when "Add Task" button is clicked */}
        {showForm && <TodoForm addTodo={addTodo} isDarkMode={isDarkMode} />}

        {/* Task list */}
        <TodoList
          todos={filteredTodos()}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          isDarkMode={isDarkMode} // Pass down dark mode state
        />
      </div>
    </div>
  );
}

export default App;
