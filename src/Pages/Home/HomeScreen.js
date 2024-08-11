//for main home page of app
//handles fetching and passing of data for each goal card as well
import React, {useState, useEffect} from 'react';
import './Home.css';
import { db } from '../../firebaseConfig';
import { collection, getDocs, addDoc, query, where, onSnapshot,doc,updateDoc, getDoc } from 'firebase/firestore';
import AddGoalCard from './addGoalCard';
import GoalCard from './GoalCard';
import TaskForm from './TaskForm'; 
import { useAuth, AuthContext } from '../UserAuthorization/AuthContext';
import Task from './Task';
import { format } from 'date-fns';
import { calculateNextDueDate } from './TaskUtils';

const HomeScreen = () => {

  //dif character state for different states 9dynamic component)
  const [characterState, setCharacterState] = useState('/assets/hungry blob.png'); //would put default character emotion here (idle)
  const [showAddGoal, setShowAddGoal] = useState(false);
  //const[goals,setGoals] = useState([]);
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();
  const username = currentUser?.email.split('@')[0];

  const [showAddTask, setShowAddTask] = useState(false); // Controls visibility of the task form
  const [goals, setGoals] = useState([]);
  //put logic to determine character emotions here 
  {/*
  const updateCharacterState = () => {
    //can put if/else needed logic
  };
*/} 

//for GoalCards in home screen
//w firebase
/*
const fetchGoals = async () => {
  const querySnapshot = await getDocs(collection(db, "goals"));
  const fetchedGoals = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  setGoals(fetchedGoals);
};

useEffect(() => {
    fetchGoals();
}, []);

//funct called after new goal added to refresh list
const handleGoalAdded = () => {
  fetchGoals();
};
*/
{/* this is if i do it without firebase
const goals = [
  { id: 1, title: 'Drink Water', description: 'Stay hydrated to improve your health.', imageUrl: '/path/to/image1.png' },
  { id: 2, title: 'Read a Book', description: 'Reading daily can expand your knowledge.', imageUrl: '/path/to/image2.png' },
  // Add more goals as needed
];
*/}

useEffect(() => {
  if (!currentUser) {
      return;
  }
  const today = new Date();
    const dayOfWeek = format(today, 'EEE').toLowerCase(); // e.g., "mon"
    const dateOfMonth = today.getDate(); // e.g., 6

    console.log("Fetching tasks for:", dayOfWeek, dateOfMonth);

    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("userId", "==", currentUser.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("Fetched tasks:", querySnapshot.size);
        const tasksData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })).filter(task => {
          console.log("Task before filter:", task);
            if (task.repeatFrequency === 'daily') {
                return true;
            }
            const weekMatch = task.daysOfWeek?.includes(dayOfWeek);
            const monthMatch = task.daysOfMonth?.includes(dateOfMonth);
            return weekMatch || monthMatch;
        });
        console.log("Filtered Tasks:", tasksData); // Check filtered tasks
        setTasks(tasksData);
    });
return () => unsubscribe();
}, [currentUser]);

const handleComplete = async (taskId) => {
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  const newTasks = [...tasks];
  newTasks[taskIndex].completed = !newTasks[taskIndex].completed;

  setTasks(newTasks); // Update local state

  // Update Firestore
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, {
      completed: newTasks[taskIndex].completed
  });
};

const markTaskComplete = async (id) => {
  const taskRef = doc(db, "tasks", id);
  await updateDoc(taskRef, {
      completed: true,
      nextDueDate: calculateNextDueDate((await getDoc(taskRef)).data()) 
  });
};

const skipTask = async (id) => {
  const taskRef = doc(db, "tasks", id);
  await updateDoc(taskRef, {
      skipped: true,  // You might want to add this attribute if you're tracking skipped tasks separately
      nextDueDate: calculateNextDueDate((await getDoc(taskRef)).data())
  });
};




return (
  <div className="home-page">
    <header className="home-header">
      <h1>Welcome {username}!</h1>
    </header>

    {/* Character Container */}
    <div className='character-container'>
      <img src='/assets/hungry blob.png' id='charImage' alt="Character"/>
      
      
    </div>

    <h2 className='goalIntro'>Your Tasks for today:</h2>
    <button className='addGoalBtn' onClick={() => setShowAddTask(true)}>+</button>
    {showAddTask && (
      <div className='addGoalPopUp'>
        <TaskForm onClose={() => setShowAddTask(false)} />
        <button className='closeBtn' onClick={() => setShowAddTask(false)}>Close</button>
      </div>
    )}

      <div>
      <h1>Current Tasks</h1>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <Task key={task.id} task={task} onComplete={handleComplete} />
        ))
    ) : (
        <p>No tasks for today.</p> // Helps indicate if there are no tasks
    )}
      </div>
  </div>
);
};
 
  export default HomeScreen;