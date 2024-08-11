import { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });

        return unsubscribe; // Cleanup funct
    }, []);

    const value = {
        currentUser
    };

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
}
