import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";

const AuthForm = ({ isSignUp }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log('User signed up successfully');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                console.log('User signed in successfully');
            }
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="text-2xl text-blue-500 font-bold">
          Tailwind CSS is working!
        </div>
    )
}

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed up
//     const user = userCredential.user;
//     // ...
//   })


// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//
// const auth = getAuth();
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })

// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });

export default AuthForm;