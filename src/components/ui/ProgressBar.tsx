import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//Defines which values the function needs
interface ProgressBarProps {
  durationInSeconds: number;
  onFinish: () => void;
}

//Function will present a Progress bar with included timer which runs down and activates Funktion passed in "onFinish"
const ProgressBar: React.FC<ProgressBarProps> = ({ durationInSeconds, onFinish, restartTimer, setRestartTimer, ...props }) => {
  const [progress, setProgress] = useState((props.remainingTimeInSeconds ?? false) ? props.remainingTimeInSeconds/durationInSeconds*100 : 100);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(props.remainingTimeInSeconds ?? durationInSeconds);
  
  const startTimer = () => {
    const onFinishTimeout = setTimeout(() => {
      onFinish();
    }, remainingTimeInSeconds * 1000);
    return () => {
      clearTimeout(onFinishTimeout);
    }
  }

  const setProgressBarPosition = (remainingTime: number) => {
    setShouldAnimate(false);
    setProgress(remainingTime/durationInSeconds*100);
    setRemainingTimeInSeconds(remainingTime);
    startAnimation();
  }
  
  const startAnimation = () => {
    const startAnimationTimeout = setTimeout(() => {
      setShouldAnimate(true);
      setProgress(0);
    }, 100);
    return () => {
      clearTimeout(startAnimationTimeout);
    }
  }
  
  useEffect(() => {
    startTimer();
    startAnimation();
  }, []);

  useEffect(() => {
    if ((props.remainingTimeInSeconds ?? false)) {
      setProgressBarPosition(props.remainingTimeInSeconds);
      // console.log("prgchanged: ",props.remainingTimeInSeconds);
    } else {
      setProgressBarPosition(durationInSeconds);
      console.log("durationInSeconds changed");
    }
  }, [durationInSeconds, props.remainingTimeInSeconds]);

  useEffect(() => {
    if (restartTimer) {
      setProgressBarPosition(durationInSeconds);
      setRestartTimer(false);
    }
  }, [restartTimer]);
  
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
    <div style={{ width: '100%', height: '3vh', backgroundColor: 'lightgray', position: 'absolute', bottom: 0, zIndex: 2}}>
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
  remainingTimeInSeconds: PropTypes.number,
  restartTimer: PropTypes.bool,
  setRestartTimer: PropTypes.func,
}
export default ProgressBar;
