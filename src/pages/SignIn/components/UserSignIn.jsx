import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../../utils/firebase';
import { Input, Button } from '@nextui-org/react';

const UserSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-in-container">
      <form id="myForm" onSubmit={signIn}>
        <div className="flex w-[400px] mx-auto flex-col flex-wrap mb-6 md:mb-0 gap-4">
          <Input
            size="md"
            type="email"
            variant={'bordered'}
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            size="md"
            type="password"
            variant={'bordered'}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" color="primary">
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserSignIn;
