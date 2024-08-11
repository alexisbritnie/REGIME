import './CharacterProfile.css'; // CSS file

import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig'; // Adjust this to your Firebase config import
//import { collection, query, where, getDocs } from 'firebase/firestore';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../UserAuthorization/AuthContext';
/*
const CharacterProfile = () => {
    const [stats, setStats] = useState({
        happiness: 0,
        hunger: 0,
        thirst: 0,
        sanity: 0,
        hygiene: 0
    });

    useEffect(() => {
        const fetchTasks = async () => {
            const statsCopy = {};

            // Assuming all tasks are stored in a 'tasks' collection
            const tasksRef = collection(db, "tasks");
            const snapshot = await getDocs(tasksRef);

            const genres = ['happiness', 'hunger', 'thirst', 'sanity', 'hygiene'];

            genres.forEach(genre => {
                const genreTasks = snapshot.docs.filter(doc => doc.data().genre === genre);
                const completedTasks = genreTasks.filter(doc => doc.data().completed === true);

                // Calculate completion percentage
                const percentage = genreTasks.length ? (completedTasks.length / genreTasks.length) * 100 : 0;
                statsCopy[genre] = percentage.toFixed(0); // Round percentage
            });

            setStats(statsCopy);
        };

        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Character Profile</h1>
            <ul>
                {Object.entries(stats).map(([genre, percentage]) => (
                    <li key={genre}>{genre}: {percentage}% completed</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterProfile;
*/
function CharacterProfile() {
  const [creationDate, setCreationDate] = useState(null);
  const { currentUser } = useAuth();

  const [notes, setNotes] = useState('');
  const maxChars = 100; // Maximum number of characters allowed in the notes section

  //for testing
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //character stats
  const [stats, setStats] = useState({
    happiness: 0,
    hunger: 0,
    thirst: 0,
    sanity: 0,
    hygiene: 0
  });

  useEffect(() => {
    const fetchTasks = async () => {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const tasks = querySnapshot.docs.map(doc => doc.data());

        const genres = ['happiness', 'hunger', 'thirst', 'sanity', 'hygiene'];
        const stats = {};

        genres.forEach(genre => {
            const genreTasks = tasks.filter(task => task.genre === genre);
            const completedTasks = genreTasks.filter(task => task.completed);
            const completionPercentage = genreTasks.length > 0 ? (completedTasks.length / genreTasks.length * 100) : 0;
            stats[genre] = completionPercentage.toFixed(0); // Format to 0 decimal places
        });

        setStats(stats);
    };

    fetchTasks();
  }, []);

    useEffect(() => {
        if (currentUser) {
            const getUserData = async () => {
                const userDoc = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(userDoc);

                if (docSnap.exists()) {
                    setCreationDate(docSnap.data().createdAt.toDate());  // Convert Firestore timestamp to JavaScript Date object
                } else {
                    console.log("No such document!");
                }
            };

            getUserData();
        }
    }, [currentUser]);

    //calculate age of blob, by day
    const calculateAge = (creationDate) => {
        if (!creationDate) return '';
        const diff = Date.now() - creationDate.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    //format date for DOB of blob :)
    const formatDate = (date) => {
      if (!date) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString("en-US", options);
    };

    //note section
    const handleNotesChange = (event) => {
      if (event.target.value.length <= maxChars) {
          setNotes(event.target.value);
      }
    };

  return (
      <div className="char-container">
          <div className="character-header">
            
              <img src="/assets/hungry blob.png" alt="Character Image" className="character-image" />
              <div className="character-details">
                  <h1>Billy Blob</h1>
                  <p>Age: {calculateAge(creationDate)} days</p>
                  <p>Type: Blob</p>
                  <p>Color: Yellow</p>
                  <p>DOB: {formatDate(creationDate)}</p>
                  
              </div>
          </div>
          <div className="notes-section">
            <label htmlFor="notes">Notes:</label>
            <br />
            <textarea id="notes" placeholder="My Blob is special because..." value={notes} onChange={handleNotesChange} maxLength={maxChars}></textarea>
            <p>{notes.length} / {maxChars} characters used</p>
          </div>
          <div className="character-stats">
        <div>
            <h1>Character Stats</h1>
            <ul>
                {Object.entries(stats).map(([genre, percentage]) => (
                    <li key={genre}>{genre.charAt(0).toUpperCase() + genre.slice(1)}: {percentage}%</li>
                ))}
            </ul>
        </div>
          </div>
      </div>
  );
}

export default CharacterProfile;