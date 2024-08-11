//goal card view
//controls how a goal looks & behave 

import React, {useEffect, useState } from 'react';
import './GoalCard.css'; // Assuming you will create a separate CSS file for styling
import useFirestore from '../../useFirestore';

import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';


const GoalCards = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const querySnapshot = await getDocs(collection(db, "goals"));
      const fetchedGoals = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGoals(fetchedGoals);
    };

    fetchGoals();
  }, []);

  return (
    <div>
      {goals.map((goal) => (
        <div key={goal.id} className="goal-card">
          <h3>{goal.title}</h3>
          <p>{goal.description}</p>
          <p>Due Date: {goal.dueDate}</p>
          <p>Status: {goal.completed ? 'Completed' : 'Pending'}</p>
          {/* edit/delete button here */}
        </div>
      ))}
    </div>
  );
};

export default GoalCards;