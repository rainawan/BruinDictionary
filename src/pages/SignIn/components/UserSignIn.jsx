import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react';
import { auth } from '../../../utils/firebase';
import { Input, Button } from '@nextui-org/react';

const UserSignIn = () => {
  const email = useRef();
  const password = useRef();
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        console.log(userCredential);
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
            variant="bordered"
            label="Email"
            isRequired={true}
            ref={email}
          />
          <Input
            size="md"
            type="password"
            variant="bordered"
            label="Password"
            isRequired={true}
            ref={password}
          />
          <Button type="submit" color="primary">
            Continue With Email
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserSignIn;
