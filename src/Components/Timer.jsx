import React, { useState, useEffect } from 'react';

const Timer = ({ endTime, stopEntry }) => {
  // Function to calculate time left until endTime
  const calculateTimeLeft = () => {
    const now = Date.now();
    const difference = (endTime * 1000) - now;
    return Math.max(0, Math.floor(difference / 1000)); // Convert to seconds, ensure non-negative
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());


  // Effect to update timeLeft every second
  useEffect(() => {
    // Update time left immediately to avoid initial delay
    setTimeLeft(calculateTimeLeft());

    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up interval on component unmount or when endTime changes
    return () => clearInterval(intervalId);
  }, [endTime]); // Rerun effect when endTime changes

  useEffect(() => {
    if (timeLeft <= 10 && timeLeft > 0) {
      // stopEntry();
    }
  },[timeLeft])
  // Format timeLeft into MM:SS format
  const formatTimeLeft = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <p className={(timeLeft <= 10 && timeLeft !== 0) ? `timer__change__color` :( timeLeft === 0)?'timer__zero_second__color': ''}>{formatTimeLeft(timeLeft)}</p>
  );
};

export default Timer;
