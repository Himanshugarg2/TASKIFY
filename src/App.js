import React, { useState, useEffect } from "react";
import "./App.css";
import { images } from "./db/images";
import Homepage from "./pages/Home/Homepage";
import { useBrowser } from "./context/browsercontext";
import Task from "./pages/Task/Task";

function App() {
  const [backgroundImage, setBackgroundImage] = useState(""); 
  const { name, nameConfirmed, browserDispatch,Time } = useBrowser();

  
  useEffect(() => {
    const userName = localStorage.getItem("name") || ""; 
    if (userName) {
      browserDispatch({ type: "NAME", payload: userName });
      browserDispatch({ type: "CONFIRM_NAME" }); 
      browserDispatch({ type: "Time" }); 

    }
  }, [browserDispatch]);

  
  useEffect(() => {
    const index = Math.floor(Math.random() * images.length);
    setBackgroundImage(images[index].image);
  }, []);

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {nameConfirmed ? <Task /> : <Homepage />}
    </div>
  );
}

export default App;
