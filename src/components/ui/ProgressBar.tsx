import React, { useState, useEffect } from "react";

//Defines which values the function needs
interface ProgressBarProps {
  durationInSeconds: number;
  onFinish: () => void;
}

//Functtion will present a Progress bar with included timer which runs down and activates Funktion passed in "onFinish"
const ProgressBar: React.FC<ProgressBarProps> = ({ durationInSeconds, onFinish }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const remainingTime = prevProgress - (1 / durationInSeconds);
        if (remainingTime <= 0) {
          clearInterval(interval);
          onFinish();
          return 0;
        }
        return remainingTime;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [durationInSeconds, onFinish]);

  return (
    <div style={{ width: '100%', height: '20px', backgroundColor: 'lightgray', position: 'relative' }}>
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: 'green',
          position: 'absolute',
          top: 0,
          left: 0,
          transition: 'width 0.01s linear',
        }}
      />
    </div>
  );
};

export default ProgressBar;
