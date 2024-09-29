// src/components/ThemeToggle.jsx

import React from 'react';
import { MdWbSunny, MdNightlight } from 'react-icons/md'; // Import icons

function ThemeToggle({ isDarkMode, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-yellow-400 text-gray-800'
      }`}
    >
      {isDarkMode ? <MdWbSunny size={24} /> : <MdNightlight size={24} />}
    </button>
  );
}

export default ThemeToggle;
