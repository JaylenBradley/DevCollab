import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import app from '../services/firebase.js'
import {createUser} from "../services/userServices.js";

const AuthForm = ({ isSignUp }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [error, setError] = useState([]);

    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = [];

        if (isSignUp) {
            if (username.length < 5) {
                errors.push('Username must be at least 5 characters');
                return;
            } if (password.length < 6) {
                errors.push('Password must be at least 6 characters');
                return;
            } if (password !== confirmedPassword) {
                errors.push('Passwords do not match');
                return;
            } if (!email.includes('@')) {
                errors.push('Please enter a valid email address');
                return;
            }

            if (errors.length > 0) {
                setError(errors);
                return;
            }

            try {
                const res = await createUserWithEmailAndPassword(auth, email, password);
                const firebaseUser = res.user;
                console.log('User signed up successfully:', firebaseUser);

                const userData = {
                  uid: firebaseUser.uid,
                  username: username,
                  email: firebaseUser.email,
                  password: password
                };

                const createdUser = await createUser(userData);
                console.log('User created in backend:', createdUser);
            } catch (err) {
                console.error('Error during email sign-up:', err.message);
                setError([err.message]);
            }
        } else {
            try {
                const res = await signInWithEmailAndPassword(auth, email, password);
                const firebaseUser = res.user;
                console.log('User signed in successfully:', firebaseUser);
            } catch (err) {
                console.error('Error during email sign-in:', err.message);
                setError([err.message]);
            }
        }
    };

    const handleGoogleSignin = async () => {
        try {
            const res = await signInWithPopup(auth, provider)
            const firebaseUser = res.user
            console.log('User logged-in with google:', firebaseUser);

            const googleEmail = firebaseUser.email;
            const derivedUsername = googleEmail.split('@')[0];

            const userData = {
              uid: firebaseUser.uid,
              username: derivedUsername,
              email: firebaseUser.email,
              password: "google-oauth-placeholder", // Placeholder password
            };

            const createdUser = await createUser(userData);
            console.log('User created in backend:', createdUser);
        } catch (err) {
            console.error('Error during Google sign-in:', err.message);
            setError(err.message)
        }
    };

    return (
        <div>
            <h2>
              {isSignUp ? 'Signup' : 'Signin'}
            </h2>
            <form onSubmit={handleSubmit}>
                {isSignUp && (
                    <div>
                        <label>Username</label>
                        <input
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Enter your username'
                        />
                    </div>
                )}
                <div>
                    <label>Email</label>
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type='text'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                    />
                </div>
                {isSignUp && (
                    <div>
                        <label>Confirm Password</label>
                        <input
                            type='text'
                            value={confirmedPassword}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                            placeholder='Confirm your password'
                        />
                    </div>
                )}
                <button type="submit">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
            </form>

            {isSignUp ? (
                <button onClick={handleGoogleSignin}>
                    Sign-up with Google
                </button>
            ) : (
                <button onClick={handleGoogleSignin}>
                    Sign-in with Google
                </button>
            )}
        </div>
    );
};

export default AuthForm;