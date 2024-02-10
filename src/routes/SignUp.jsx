import { getAuth, updateEmail, createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../utils/firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);

      setEmail('');
      setPassword('');
    })
    .catch((error) => {
      console.log(error);
    });

  const signUp = (e) => {
    e.preventDefault();
    updateEmail(auth.currentUser, 'user@example.com')
      .then(() => {
        console.log(auth.currentUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="sign-up-container">
      <form onSubmit={signUp}>
        <h1>Create Account</h1>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}></input>
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
