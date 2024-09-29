import React, { useState } from 'react';

const TodoForm = ({ addTodo, isDarkMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return; // Prevent empty title submission

    addTodo({ title, description, dueDate, priority });
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Low');
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col space-y-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400' : 'bg-gray-200 border-gray-400 placeholder-gray-500'}`}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={`p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400' : 'bg-gray-200 border-gray-400 placeholder-gray-500'}`}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className={`p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-400'}`}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className={`p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-400'}`}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button
        type="submit"
        className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ${isDarkMode ? 'hover:bg-blue-500' : ''}`}
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
