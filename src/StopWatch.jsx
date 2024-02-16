import React, { useEffect, useRef, useState } from "react";
import playImg from "./assets/images/play.png";
import stopImg from "./assets/images/stop-button.png";
import resetImg from "./assets/images/undo.png";
function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(
          (prevTime) => Date.now() - (startTimeRef.current ?? Date.now())
        );
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startTimeRef = useRef(null);
  const handleStart = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  };
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="container">
      <div className="timer-display">{formatTime(elapsedTime)}</div>
      <div className="buttons">
        <button onClick={handleStop} disabled={!isRunning}>
          <img width="40px" src={stopImg} alt="" />
        </button>
        <button onClick={handleStart} disabled={isRunning}>
          <img width="40px" src={playImg} alt="" />
        </button>
        <button onClick={handleReset}>
          <img width="40px" src={resetImg} alt="" />
        </button>
      </div>
    </div>
  );
}

export default StopWatch;
