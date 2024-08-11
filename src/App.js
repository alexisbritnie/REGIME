// to run app put 'npm start' in terminal
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes, Navigate } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/firestore'; // If using Firestore

import HomeScreen from './Pages/Home/HomeScreen'; // Import your page components
import CharacterProfile from './Pages/CharcterProfile/CharacterProfile'; 
//import Goals from './pages/Goals';
import Settings from './Pages/Settings/SettingsScreen';
import BottomNavigationBar from './Pages/BottomNavigationBar';
//import AuthForm from './Pages/UserAuthorization/AuthForm';
import SignUp from './Pages/UserAuthorization/SignUp';
import { AuthProvider, useAuth } from './Pages/UserAuthorization/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Pages/UserAuthorization/Login';


function App() {
  return (
    
    <Router>
      <AuthProvider>
      <div className="App">
        {/* app routes */}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />


          <Route path="/" element={ <ProtectedRoute> <HomeScreen /> </ProtectedRoute> } />
          {/* Redirect all other routes to SignUp if not logged in */}
          <Route path="*" element={<Navigate replace to="/signup" />} />
          <Route path="/CharacterProfile" element={<CharacterProfile />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* put other routes here */}
        </Routes>
        
        {/* Bottom navigation bar */}
        <BottomNavigationBar />
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
