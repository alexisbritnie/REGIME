//allow for skipping/completion of tasks
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import React from 'react';
import './Task.css';
import genreIcons from '../../config/icons';


const Task = ({ task, onComplete }) => {
    const iconUrl = genreIcons[task.genre] || '/icons/default-icon.png';
    console.log("Task Component, received task:", task);
    const markComplete = async () => {
        const taskRef = doc(db, "tasks", task.id);
        await updateDoc(taskRef, {
            completed: true
        });
    };

    const skipTask = async () => {
        const taskRef = doc(db, "tasks", task.id);
        await updateDoc(taskRef, {
            skipped: true
        });
    };

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <img src={iconUrl} alt={task.genre} className='task-icon'/>
            <span className="task-name">{task.name}</span>
            <button onClick={() => onComplete(task.id)} className="toggle-task">
                {task.completed ? '✓' : '⬜'}
            </button>
        </div>
    );
    
};

export default Task;