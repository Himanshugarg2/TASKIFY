import React, { useEffect, useState } from 'react';
import { useBrowser } from '../../context/browsercontext';
import { quotes } from '../../db/quotes';
import { Todo } from '../../Components/Todo';

// Move this to a separate config or utils file in a real application
const getRandomQuote = () => {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index].quote;
};

function Task() {
  const [isChecked, setChecked] = useState(false);
  const { name, time, browserDispatch, message, task } = useBrowser();
  const [currentQuote] = useState(getRandomQuote()); // Store quote in state to prevent re-renders

  useEffect(() => {
    // Initialize task from localStorage
    const userTask = localStorage.getItem("task");
    if (userTask) {
      browserDispatch({
        type: "TASK",
        payload: userTask
      });
    }

    // Check if it's a new day and clear previous task
    const storedDate = localStorage.getItem("date");
    if (storedDate && new Date().getDate() !== Number(storedDate)) {
      localStorage.removeItem("task");
      localStorage.removeItem("date");
      localStorage.removeItem("checkedStatus");
      browserDispatch({ type: "TASK", payload: null });
    }

    // Initialize checked status
    const savedCheckedStatus = localStorage.getItem("checkedStatus");
    if (savedCheckedStatus) {
      setChecked(savedCheckedStatus === "true");
    }
  }, [browserDispatch]);

  // Update time every second
  useEffect(() => {
    const getCurrentTime = () => {
      const today = new Date();
      const hours = today.getHours();
      const minutes = today.getMinutes();
      const seconds = today.getSeconds();
      
      const formattedTime = [hours, minutes, seconds]
        .map(unit => unit < 10 ? `0${unit}` : unit)
        .join(':');
      
      browserDispatch({
        type: "TIME",
        payload: formattedTime,
      });
      
      browserDispatch({
        type: "MESSAGE",
        payload: hours,
      });
    };

    getCurrentTime(); // Initial call
    const interval = setInterval(getCurrentTime, 1000);
    return () => clearInterval(interval);
  }, [browserDispatch]);

  const handleTaskSubmit = (event) => {
    event.preventDefault();
    const taskInput = event.target.elements.taskInput;
    if (taskInput.value.trim()) {
      browserDispatch({ type: "TASK", payload: taskInput.value });
      localStorage.setItem("task", taskInput.value);
      localStorage.setItem("date", new Date().getDate());
    }
  };

  const handleTaskKeyDown = (event) => {
    if (event.key === "Enter" && event.target.value.trim() && name.trim()) {
      handleTaskSubmit(event);
    }
  };

  const handleCheckboxChange = () => {
    const newStatus = !isChecked;
    setChecked(newStatus);
    localStorage.setItem("checkedStatus", String(newStatus));
  };

  const handleClearTask = () => {
    localStorage.removeItem("task");
    localStorage.removeItem("date");
    localStorage.removeItem("checkedStatus");
    browserDispatch({ type: "TASK", payload: null });
    setChecked(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
        {/* Time Display */}
        <div className="text-7xl font-extralight tracking-wide mb-4">
          {time}
        </div>
        
        {/* Greeting Message */}
        <div className="text-4xl font-medium text-white/90 mb-12">
          {message} {name}
        </div>
        
        {/* Task Section */}
        <div className="w-full max-w-lg">
          {name.trim() && !task ? (
            <form onSubmit={handleTaskSubmit} className="space-y-6">
              <div className="text-2xl text-white/90 text-center font-medium">
                What is your main focus for today?
              </div>
              <input
                name="taskInput"
                type="text"
                onKeyDown={handleTaskKeyDown}
                className="w-full bg-transparent border-b-2 border-white/30 hover:border-white/50 
                         focus:border-white/80 outline-none px-4 py-2 text-xl text-center
                         placeholder-white/50 transition-colors duration-300"
                placeholder="Type and press Enter"
                autoComplete="off"
              />
            </form>
          ) : task && (
            <div className="flex flex-col items-center space-y-4">
              <div className="text-lg text-white/70 uppercase tracking-widest font-light">
                Today's Focus
              </div>
              
              <div className="flex items-center space-x-4 bg-black/20 backdrop-blur-sm 
                            rounded-lg px-6 py-4 w-full">
                <input
                  type="checkbox"
                  id="mainTask"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 rounded-md border-2 border-white/30 text-blue-400 
                           focus:ring-2 focus:ring-blue-400 focus:ring-offset-0 
                           bg-transparent cursor-pointer"
                />
                <label
                  htmlFor="mainTask"
                  className={`text-2xl cursor-pointer select-none transition-all duration-300
                            ${isChecked ? "line-through text-white/50" : "text-white"}`}
                >
                  {task}
                </label>
              </div>
              
              <button
                onClick={handleClearTask}
                className="mt-4 px-5 py-2 text-sm text-white/80 hover:text-white
                         border border-white/20 hover:border-white/40 rounded-full
                         hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Clear Focus
              </button>
            </div>
          )}
        </div>
        
        {/* Quote Display */}
        <div className="mt-auto mb-12 text-white/80 text-center italic max-w-md 
                      text-lg font-light leading-relaxed">
          {currentQuote}
        </div>

        {/* Todo Component */}
        <Todo />
      </div>
    </div>
  );
}

export default Task;