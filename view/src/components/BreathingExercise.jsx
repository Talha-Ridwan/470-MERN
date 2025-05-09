import React, { useState, useEffect } from 'react';
import '../styles/BreathingExercise.css';

const BreathingExercise = () => {
  const [phase, setPhase] = useState('inhale');
  const [seconds, setSeconds] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [totalCycles, setTotalCycles] = useState(5);
  const [progress, setProgress] = useState(0);
  const [durations, setDurations] = useState({
    inhale: 4,
    hold: 4,
    exhale: 6,
  });

  const phases = {
    inhale: { duration: durations.inhale, text: 'Inhale', color: '#4a90e2' },
    hold: { duration: durations.hold, text: 'Hold', color: '#50c878' },
    exhale: { duration: durations.exhale, text: 'Exhale', color: '#ff6b6b' },
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 0) {
            if (phase === 'inhale') {
              setPhase('hold');
              return durations.hold;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return durations.exhale;
            } else {
              setPhase('inhale');
              setCycleCount((prev) => {
                const newCount = prev + 1;
                if (newCount >= totalCycles) {
                  setIsRunning(false);
                  setProgress(100);
                  return 0;
                }
                setProgress((newCount / totalCycles) * 100);
                return newCount;
              });
              return durations.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, phase, totalCycles, durations]);

  const startExercise = () => {
    setIsRunning(true);
    setCycleCount(0);
    setProgress(0);
    setPhase('inhale');
    setSeconds(durations.inhale);
  };

  const pauseExercise = () => {
    setIsRunning(false);
  };

  const resetExercise = () => {
    setIsRunning(false);
    setCycleCount(0);
    setProgress(0);
    setPhase('inhale');
    setSeconds(durations.inhale);
  };

  const handleCycleChange = (e) => {
    setTotalCycles(Number(e.target.value));
  };

  const handleDurationChange = (e, phase) => {
    const value = Math.max(1, Math.min(10, Number(e.target.value)));
    setDurations((prev) => ({ ...prev, [phase]: value }));
    if (phase === 'inhale' && !isRunning) {
      setSeconds(value);
    }
  };

  return (
    <div className="breathing-container">
      <h1>Guided Breathing Exercise</h1>
      <div className="duration-selector">
        <label>
          Inhale (s):
          <input
            type="number"
            min="1"
            max="10"
            value={durations.inhale}
            onChange={(e) => handleDurationChange(e, 'inhale')}
            disabled={isRunning}
          />
        </label>
        <label>
          Hold (s):
          <input
            type="number"
            min="1"
            max="10"
            value={durations.hold}
            onChange={(e) => handleDurationChange(e, 'hold')}
            disabled={isRunning}
          />
        </label>
        <label>
          Exhale (s):
          <input
            type="number"
            min="1"
            max="10"
            value={durations.exhale}
            onChange={(e) => handleDurationChange(e, 'exhale')}
            disabled={isRunning}
          />
        </label>
      </div>
      <div className="circle-container">
        <div
          className="breathing-circle"
          style={{
            backgroundColor: phases[phase].color,
            transform: `scale(${phase === 'inhale' ? 1.5 : phase === 'exhale' ? 0.8 : 1})`,
          }}
        >
          <span className="breathing-text">{phases[phase].text}</span>
          <span className="breathing-timer">{seconds}s</span>
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="controls">
        <button onClick={startExercise} disabled={isRunning}>
          Start
        </button>
        <button onClick={pauseExercise} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={resetExercise}>Reset</button>
      </div>
      <div className="cycle-selector">
        <label htmlFor="cycles">Number of Cycles: </label>
        <input
          type="number"
          id="cycles"
          min="1"
          max="20"
          value={totalCycles}
          onChange={handleCycleChange}
          disabled={isRunning}
        />
      </div>
      <div className="cycle-count">Cycles Completed: {cycleCount}/{totalCycles}</div>
    </div>
  );
};

export default BreathingExercise;