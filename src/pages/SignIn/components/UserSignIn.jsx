import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../../../utils/firebase';
import { Input, Button } from '@nextui-org/react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';

const UserSignIn = () => {
  const email = useRef();
  const password = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error.code);
        const message = error.code.replace('-', ' ').replace('auth/', '');
        console.log('message', message);
        setErrorMessage(message);
        setIsInvalid(true);
      });
  };

  const handleInputClick = () => {
    setIsInvalid(false);
  };

  return (
    <div className="sign-in-container">
      <form id="myForm" onSubmit={signIn}>
        <div className="flex w-[400px] mx-auto flex-col flex-wrap mb-6 md:mb-0 gap-4">
          <Input
            label="Email"
            size="md"
            variant="bordered"
            isRequired={true}
            ref={email}
            isInvalid={isInvalid}
            color={isInvalid ? 'danger' : 'default'}
            onClick={handleInputClick}
          />
          <Input
            label="Password"
            size="md"
            variant="bordered"
            isRequired={true}
            ref={password}
            isInvalid={isInvalid}
            color={isInvalid ? 'danger' : 'default'}
            onClick={handleInputClick}
            endContent={
              <div className="m-auto mr-1 cursor-pointer" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeInvisibleFilled className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilled className="text-2xl text-default-400 pointer-events-none" />
                )}
              </div>
            }
            type={isVisible ? 'text' : 'password'}
          />
          <p className="text-left text-[#f31260]">
            {errorMessage === 'invalid credential' && <p>Please enter valid credentials.</p>}
          </p>
          <Button type="submit" color="primary">
            Continue With Email
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserSignIn;
