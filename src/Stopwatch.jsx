import React, { useEffect, useRef, useState } from 'react';

function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = Date.now() - time;
            intervalRef.current = setInterval(() => {
                setTime(Date.now() - startTimeRef.current);
            }, 10);
        } 
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    function start() {
        setIsRunning(true);
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setIsRunning(false);
        setTime(0);
    }

    function formatTime() {
        const hours = Math.floor(time / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <div className='stopwatch'>
            <h1>Stopwatch</h1>
            <div className='stopwatch__timer'>{formatTime()}</div>
            <div className='stopwatch__controls'>
                <button onClick={start} className='start'>Start</button>
                <button onClick={stop} className='stop'>Stop</button>
                <button onClick={reset} className='reset'>Reset</button>
            </div>
        </div>
    );
}

export default Stopwatch;
