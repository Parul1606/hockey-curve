import { useState } from "react";
import PropTypes from "prop-types";
import { MdEdit, MdDelete} from "react-icons/md"; // Import icons

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate);
  const [editedPriority, setEditedPriority] = useState(todo.priority);

  const handleToggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(todo.id, {
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDueDate,
      priority: editedPriority,
    });
    setIsEditing(false); // Close editing mode after saving
  };

  // Define color classes based on priority
  const priorityColor =
    todo.priority === "High"
      ? "border-red-500"
      : todo.priority === "Medium"
      ? "border-yellow-500"
      : "border-green-500";

  const priorityTextColor =
    todo.priority === "High"
      ? "text-red-500"
      : todo.priority === "Medium"
      ? "text-yellow-500"
      : "text-green-500";

  return (
    <li
      className={`mb-2 mt-4 mr-3 p-4 border-l-4 ${priorityColor} bg-gray-50 shadow-md`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2
            className={`font-bold cursor-pointer ${
              todo.isCompleted ? "line-through text-gray-500" : ""
            }`}
            onClick={handleToggleAccordion}
          >
            {todo.title}
          </h2>
          <p className="text-sm text-gray-600">Due: {todo.dueDate}</p>
          <p className={`text-sm ${priorityTextColor}`}>
            Priority: {todo.priority}
          </p>
        </div>

        {/* Accordion toggle */}
        <button
          className="flex items-center justify-center text-emerald-800 focus:outline-none"
          onClick={handleToggleAccordion}
        >
          <span className="text-xl font-bold">{isExpanded ? "▲" : "▼"}</span>
        </button>
      </div>

      {isExpanded && (
        <div className="mt-2">
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 mb-2"
              />
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 mb-2"
              />
              <input
                type="date"
                value={editedDueDate}
                onChange={(e) => setEditedDueDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 mb-2"
              />
              <select
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 mb-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 text-white rounded px-3 py-1"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white rounded px-3 py-1"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p>
                <strong>Title:</strong> {todo.title}
              </p>
              <p>
                <strong>Description:</strong> {todo.description}
              </p>
              <p>
                <strong>Due Date:</strong> {todo.dueDate}
              </p>
              <p>
                <strong>Priority:</strong> {todo.priority}
              </p>

              <div className="flex space-x-2">
                
                <button
                  className="bg-yellow-500 text-white rounded px-3 py-1 flex items-center"
                  onClick={handleEdit}
                >
                  <MdEdit className="mr-1" />
                </button>

                <button
                  className="bg-green-500 text-white rounded px-3 py-1 flex items-center"
                  onClick={() => toggleComplete(todo.id)}
                >
                  {todo.isCompleted ? "Undo" : "Complete"}
                </button>

                <button
                  className="bg-red-500 text-white rounded px-3 py-1 flex items-center"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <MdDelete className="mr-1" /> 
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export default TodoItem;

// PropTypes
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
