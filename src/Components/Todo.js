import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

export const Todo = () => {
  const [todo, setTodo] = useState('');
  const [todoDateTime, setTodoDateTime] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const userTodo = JSON.parse(localStorage.getItem('todo'));
    userTodo && setTodoList(userTodo);
  }, []);

  const handleTodoInputChange = (event) => {
    setTodo(event.target.value);
  };

  const handleDateTimeChange = (event) => {
    setTodoDateTime(event.target.value);
  };

  const handleTodoEnterKey = () => {
    if (todo.trim() && todoDateTime) {
      const updatedTodoList = [
        ...todoList,
        { _id: uuid(), todo, isCompleted: false, timestamp: todoDateTime },
      ];
      setTodoList(updatedTodoList);
      setTodo('');
      setTodoDateTime('');
      localStorage.setItem('todo', JSON.stringify(updatedTodoList));
    }
  };

  const handleTodoCheckChange = (todoId) => {
    const updatedTodoList = todoList.map((todo) =>
      todoId === todo._id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodoList(updatedTodoList);
    localStorage.setItem('todo', JSON.stringify(updatedTodoList));
  };

  const handleTodoDeleteClick = (todoId) => {
    const updatedTodoList = todoList.filter(({ _id }) => _id !== todoId);
    setTodoList(updatedTodoList);
    localStorage.setItem('todo', JSON.stringify(updatedTodoList));
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="fixed bottom-4 right-4">
      <div
        className="w-80 bg-black/30 backdrop-blur-md rounded-lg p-4 
                    border border-white/10 shadow-lg relative flex flex-col items-center justify-center"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-4 px-6 py-3 bg-white/10 hover:bg-white/20 text-white 
                     rounded-full backdrop-blur-sm transition-all duration-300"
        >
          {isOpen ? 'Hide Todo List' : 'Show Todo List'}
        </button>

        {isOpen && (
          <div className="w-full">
            <input
              className="w-full bg-white/10 text-white placeholder-white/50 
                     border-b border-white/20 px-4 py-2 outline-none focus:border-white/40
                     transition-colors duration-300 rounded-t-lg"
              placeholder="Add a todo"
              value={todo}
              onChange={handleTodoInputChange}
            />
            <input
              type="datetime-local"
              className="w-full bg-white/10 text-white placeholder-white/50 
                     border-b border-white/20 px-4 py-2 outline-none focus:border-white/40
                     transition-colors duration-300 mt-2 rounded-lg"
              value={todoDateTime}
              onChange={handleDateTimeChange}
            />
            <button
              onClick={handleTodoEnterKey}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4 py-2 rounded-lg"
            >
              Add Todo
            </button>

            <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
              {todoList.map(({ todo, _id, isCompleted, timestamp }) => (
                <div
                  key={_id}
                  className="flex items-start justify-between group py-2 px-3
                           hover:bg-white/5 rounded-lg transition-colors duration-200"
                >
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={() => handleTodoCheckChange(_id)}
                      checked={isCompleted}
                      className="w-4 h-4 rounded border-white/30 text-blue-400
                               focus:ring-2 focus:ring-blue-400 focus:ring-offset-0
                               bg-transparent cursor-pointer"
                    />
                    <div>
                      <span
                        className={`text-white/90 ${
                          isCompleted ? 'line-through text-white/50' : ''
                        }`}
                      >
                        {todo}
                      </span>
                      <div className="text-sm text-white/50">
                        {formatDateTime(timestamp)}
                      </div>
                    </div>
                  </label>

                  <button
                    onClick={() => handleTodoDeleteClick(_id)}
                    className="text-white/50 hover:text-white/90 opacity-0 group-hover:opacity-100
                             transition-opacity duration-200"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
