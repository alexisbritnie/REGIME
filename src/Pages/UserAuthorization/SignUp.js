import React, { useState } from 'react';
import { auth,db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
// lets user sign u, and navs straight to homepage upon successful sig up



function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  

  const handleSignUp = async (event) => {
      event.preventDefault();
      if (password !== confirmPassword) {
          setError("Passwords do not match.");
          return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          //save account creation date in firestore
          await setDoc(doc(db, "users", user.uid), {
            createdAt: new Date()  // Stores the current date as the creation date
        });
          navigate('/'); // Navigate to the homepage or dashboard upon successful signup
      } catch (error) {
          setError("Failed to create an account. " + error.message);
      }
  };

  const handleNavLogin = () => {
    navigate('/login');
  };

  return (
      <div className="signup-form">
          <h2>Sign Up</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSignUp}>
              <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
              <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
              <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
              />
              <button type="submit">Sign Up</button>
          </form>
          <p>Already have an account? <button onClick={handleNavLogin}>Log In</button></p>
      </div>
  );
}

export default SignUp;
