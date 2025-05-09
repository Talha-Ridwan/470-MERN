import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import '../styles/styles.css'

const Challenge = () => {
    const [challengeData, setChallengeData] = useState(null);

    const fetchChallenge = async () => {
        try {
            const response = await axios.get('/api/challenge/current', { withCredentials: true });
            setChallengeData(response.data);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'An error occurred');
        }
    };

    useEffect(() => {
        fetchChallenge();
    }, []);

    const startChallenge = async (duration) => {
        try {
            await axios.post('/api/challenge/start', { duration }, { withCredentials: true });
            fetchChallenge();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Failed to start challenge');
        }
    };

    const completeDay = async () => {
        try {
            await axios.post('/api/challenge/complete-day', {}, { withCredentials: true });
            fetchChallenge();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Failed to complete day');
        }
    };

    const cancelChallenge = async () => {
        try {
            await axios.post('/api/challenge/cancel', {}, { withCredentials: true });
            fetchChallenge();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Failed to cancel challenge');
        }
    };

    if (!challengeData) {
        return <div className="loading">Loading...</div>;
    }

    const { status, duration, progress, accessibleDay, tasks } = challengeData;

    if (status === 'none') {
        return (
            <div className="challenge-container">
                <h2 className="title">Start a Mental Health Challenge</h2>
                <div className="actions">
                    <button className="btn primary" onClick={() => startChallenge(3)}>Start 3-Day Challenge</button>
                    <button className="btn primary" onClick={() => startChallenge(7)}>Start 7-Day Challenge</button>
                </div>
            </div>
        );
    } else if (status === 'ongoing') {
        const visibleTasks = tasks.filter(task => task.day <= accessibleDay);
        const currentDayTask = tasks.find(task => task.day === accessibleDay);
        const isCurrentDayCompleted = currentDayTask ? currentDayTask.isCompleted : false;

        return (
            <div className="challenge-container">
                <h2 className="title">Mental Health Challenge - Day {accessibleDay} of {duration}</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Tasks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleTasks.map(dayTask => (
                            <tr key={dayTask.day}>
                                <td className="day-column">Day {dayTask.day}</td>
                                <td>
                                    <ul className={dayTask.isCompleted ? 'completed-tasks' : 'task-list'}>
                                        {dayTask.tasks.map((task, index) => (
                                            <li key={index}>{task}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="actions">
                    {!isCurrentDayCompleted && (
                        <button className="btn success" onClick={completeDay}>Mark as Complete</button>
                    )}
                    <button className="btn danger" onClick={cancelChallenge}>Cancel Challenge</button>
                </div>
            </div>
        );
    } else if (status === 'completed') {
        return (
            <div className="challenge-container">
                <h2 className="title">Congratulations! You have completed the challenge.</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Tasks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(dayTask => (
                            <tr key={dayTask.day}>
                                <td className="day-column">Day {dayTask.day}</td>
                                <td>
                                    <ul className="completed-tasks">
                                        {dayTask.tasks.map((task, index) => (
                                            <li key={index}>{task}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3 className="subtitle">Start a new challenge</h3>
                <div className="actions">
                    <button className="btn primary" onClick={() => startChallenge(3)}>Start 3-Day Challenge</button>
                    <button className="btn primary" onClick={() => startChallenge(7)}>Start 7-Day Challenge</button>
                </div>
            </div>
        );
    }
};

export default Challenge;