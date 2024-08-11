import React, { useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const AddGoalCard = () => {
  const [goalCard, setGoalCard] = useState({ 
    title: '', 
    description: '', 
    dueDate: '', 
    completed: false 
});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "goals"), goalCard);
      console.log("Goal added successfully");
      // Clear form or give feedback
    } catch (error) {
      console.error("Error adding goal card:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={goalCard.title}
        onChange={(e) => setGoalCard({ ...goalCard, title: e.target.value })}
        placeholder="Goal Title"
        required
      />
      <textarea
        value={goalCard.description}
        onChange={(e) => setGoalCard({ ...goalCard, description: e.target.value })}
        placeholder="Goal Description"
        required
      />
      <input
        type="date"
        value={goalCard.dueDate}
        onChange={(e) => setGoalCard({ ...goalCard, dueDate: e.target.value })}
        required
      />
      <button type="submit">Add Goal</button>
    </form>
  );
};

export default AddGoalCard;