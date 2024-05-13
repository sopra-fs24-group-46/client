import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//Defines which values the function needs
interface ProgressBarProps {
  durationInSeconds: number;
  onFinish: () => void;
}

//Function will present a Progress bar with included timer which runs down and activates Funktion passed in "onFinish"
const ProgressBar: React.FC<ProgressBarProps> = ({ durationInSeconds, onFinish, ...props }) => {
  const [progress, setProgress] = useState(props.progress ?? 100);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState((props.progress ?? false) ? durationInSeconds * (props.progress / 100) : durationInSeconds);
  
  const startTimer = () => {
    const onFinishTimeout = setTimeout(() => {
      onFinish();
    }, remainingTimeInSeconds * 1000);
    return () => {
      clearTimeout(onFinishTimeout);
    }
  }
  
  const onProgressChange = (progress: number) => {
    setShouldAnimate(false);
    setProgress(progress);
    setRemainingTimeInSeconds(durationInSeconds * (progress / 100));
    startAnimation();
  }
  
  const startAnimation = () => {
    const startAnimationTimeout = setTimeout(() => {
      setShouldAnimate(true);
      setProgress(0);
    }, 50);
    return () => {
      clearTimeout(startAnimationTimeout);
    }
  }
  
  useEffect(() => {
    startTimer();
    startAnimation();
  }, []);

  useEffect(() => {
    if ((props.progress ?? false)) {
      onProgressChange(props.progress);
      console.log("prgchanged: ",props.progress);
    }
  }, [durationInSeconds]);
  
  const smoothSteps = (amount: number, lag: boolean) => {
    const points = [0];
    if(lag) points.push(0);
    for (let i = 1; i < amount; i++) {
      points.push(i / amount);
      points.push(i / amount);
    }
    if(!lag) points.push(1);
    points.push(1);
    return points;
  }

  return (
    <div style={{ width: '100%', height: '2vh', backgroundColor: 'lightgray', position: 'relative' }}>
      {/* light green follow bar */}
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: 'lightgreen',
          position: 'absolute',
          top: 0,
          left: 0,
          transition: shouldAnimate ?`width ${remainingTimeInSeconds}s linear(${smoothSteps(remainingTimeInSeconds, true)})` : 'none',
        }}
      />
      {/* dark green first bar */}
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: 'green',
          position: 'absolute',
          top: 0,
          left: 0,
          transition: shouldAnimate ? `width ${remainingTimeInSeconds}s linear(${smoothSteps(remainingTimeInSeconds, false)})` : 'none',
        }}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  durationInSeconds: PropTypes.number.isRequired,
  onFinish: PropTypes.func.isRequired,
  progress: PropTypes.number,
}
export default ProgressBar;
