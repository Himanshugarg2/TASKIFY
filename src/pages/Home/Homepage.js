import "../../index.css";
import React from "react";
import { useBrowser } from "../../context/browsercontext";

function Homepage() {
  const { name, browserDispatch } = useBrowser();

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleNameChange = (event) => {
    browserDispatch({
      type: "NAME",
      payload: event.target.value, 
    });
    localStorage.setItem("name", event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && name.trim().length > 0) {
      localStorage.setItem("name", name); 
      browserDispatch({ type: "CONFIRM_NAME" });
    }
  };

  return (
    <div className="flex justify-center pt-8">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">
          Browser Extension
        </h1>
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-2xl font-bold text-white">
              Hello! What is your name?
            </span>
            <form action="" onSubmit={handleFormSubmit}>
              <input
                type="text"
                value={name} 
                onChange={handleNameChange} 
                onKeyDown={handleKeyDown} 
                className="mt-4 w-full border-b border-white focus:border-white outline-none px-0 text-lg bg-transparent text-center text-white placeholder-white"
                placeholder="Type your name..."
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
