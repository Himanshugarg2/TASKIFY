import React, { createContext, useContext, useReducer } from "react";
import browserReducer from "../reducer/browserReducer";

const initialValue = {
  name: "",
  nameConfirmed: false,
  time:"" ,
  message:"",
  task:null
};

// Create the Browser context
const BrowserContext = createContext(initialValue);

// Provider component
const BrowserProvider = ({ children }) => {
  const [state, browserDispatch] = useReducer(browserReducer, initialValue);

  return (
    <BrowserContext.Provider value={{ ...state, browserDispatch }}>
      {children}
    </BrowserContext.Provider>
  );
};

// Custom hook to use the Browser context
const useBrowser = () => useContext(BrowserContext);

export { useBrowser, BrowserProvider };
