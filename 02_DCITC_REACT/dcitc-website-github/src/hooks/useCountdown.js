import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to handle countdown timer logic
 * @param {string} targetDate - Target date string (ISO format preferred: "2026-03-20" or "2026-03-20T09:00:00")
 * @returns {Object} - { days, hours, minutes, seconds, isExpired }
 */
const useCountdown = (targetDate) => {
  const calculateTimeLeft = useCallback(() => {
    // Handle various date formats
    let target;
    if (!targetDate) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }
    
    // If it's already an ISO date, parse directly
    if (targetDate.includes('-') && targetDate.length >= 10) {
      // Add time if not present (default to 9:00 AM)
      const dateStr = targetDate.includes('T') ? targetDate : `${targetDate}T09:00:00`;
      target = new Date(dateStr).getTime();
    } else {
      // Try parsing as regular date string
      target = new Date(targetDate).getTime();
    }
    
    // Check if parsing was successful
    if (isNaN(target)) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }
    
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isExpired: false,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    // Don't start interval if already expired
    if (timeLeft.isExpired) return;

    const intervalId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // Clear interval if timer expires
      if (newTimeLeft.isExpired) {
        clearInterval(intervalId);
      }
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [calculateTimeLeft, timeLeft.isExpired]);

  return timeLeft;
};

export default useCountdown;
