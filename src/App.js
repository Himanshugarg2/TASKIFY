import React, { useState, useEffect } from "react";
import "./App.css";
import { images } from "./db/images";
import Homepage from "./pages/Home/Homepage";
import { useBrowser } from "./context/browsercontext";
import Task from "./pages/Task/Task";

function App() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const { nameConfirmed, browserDispatch } = useBrowser();

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
        position: "relative",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {/* Semi-transparent overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Adjust opacity here (0.4 for 40% opacity)
          zIndex: 1,
        }}
      ></div>
      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {nameConfirmed ? <Task /> : <Homepage />}
      </div>
    </div>
  );
}

export default App;
