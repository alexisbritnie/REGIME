import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent the form from being submitted traditionally

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/'); // Navigate to the home page or dashboard
        } catch (error) {
            setError("Failed to login: " + error.message); // Handle errors like wrong password or user not found
        }
    };

    const handleNavigateToSignUp = () => {
        navigate('/signup'); // Optional: Navigate to the signup page
    };

    return (
        <div className="login-form">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Log In</button>
                <br />
                <p>Dont have an account? <button onClick={handleNavigateToSignUp}>Sign Up</button></p>
            </form>
        </div>
    );
}
export default Login;