import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './TaskForm.css';
import {useAuth} from '../UserAuthorization/AuthContext';

const TaskForm = ({ onClose }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskGenre, setTaskGenre] = useState('happiness');
    const [taskTime, setTaskTime] = useState('');
    const [repeatFrequency, setRepeatFrequency] = useState('does not repeat');
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [daysOfMonth, setDaysOfMonth] = useState([]);
    const { currentUser } = useAuth();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
        try {
          await addDoc(collection(db, "tasks"), {
            name: taskName,
            description: taskDescription,
            genre: taskGenre,
            time: taskTime,
            repeatFrequency,
            daysOfWeek,
            daysOfMonth,
            userId: currentUser.uid,
            completed: false,  // Initialize the task as not completed
            createdAt: new Date(),
            skipped: false, // Initialize the task as not skipped
            //userId: currentUser.uid, // Add the user ID to the task
          });
          onClose(); // Close form on successful submission
        } catch (error) {
          console.error("Error adding task:", error);
          alert("Error adding task: " + error.message);
      }
  };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>Task Name:</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <label>Description:</label>
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        />
        <label>Genre:</label>
        <select value={taskGenre} onChange={(e) => setTaskGenre(e.target.value)}>
          <option value="happiness">Happiness</option>
          <option value="hunger">Hunger</option>
          <option value="thirst">Thirst</option>
          <option value="sanity">Sanity</option>
          <option value="hygiene">Hygiene</option>
          <option value="other">Other</option>
        </select>
        <label>Repeat Frequency:</label>
        <select value={repeatFrequency} onChange={(e) => setRepeatFrequency(e.target.value)}>
          <option value="does not repeat">Does Not Repeat</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        
        {repeatFrequency === 'daily' && (
          <input
            type="time"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            required
          />
        )}
  
        {repeatFrequency === 'weekly' && (
          <div>
            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
              <label key={day}>
                <input
                  type="checkbox"
                  checked={daysOfWeek.includes(day)}
                  onChange={() => {
                    setDaysOfWeek(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
                  }}
                />
                {day}
              </label>
            ))}
          </div>
        )}
  
        {repeatFrequency === 'monthly' && (
          <div>
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
              <label key={day}>
                <input
                  type="checkbox"
                  checked={daysOfMonth.includes(day)}
                  onChange={() => {
                    setDaysOfMonth(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
                  }}
                />
                {day}
              </label>
            ))}
          </div>
        )}
  
        <button type="submit">Add Task</button>
      </form>
  );
};

export default TaskForm;