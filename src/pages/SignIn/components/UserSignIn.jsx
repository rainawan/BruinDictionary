import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../../utils/firebase';
import { Input, Button } from '@nextui-org/react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';

const UserSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setEmail('');
        setPassword('');
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
            size="md"
            type="email"
            label="Email"
            value={email}
            variant="bordered"
            isInvalid={isInvalid}
            color={isInvalid ? 'danger' : 'default'}
            onChange={(e) => setEmail(e.target.value)}
            onClick={handleInputClick}
          />
          <Input
            size="md"
            variant="bordered"
            label="Password"
            value={password}
            isInvalid={isInvalid}
            color={isInvalid ? 'danger' : 'default'}
            onChange={(e) => setPassword(e.target.value)}
            onClick={handleInputClick}
            endContent={
              <Button
                className="focus:outline-none bg-transparent pt-2"
                type="button"
                size="sm"
                disableRipple="true"
                onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeInvisibleFilled className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilled className="text-2xl text-default-400 pointer-events-none" />
                )}
              </Button>
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
