import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, Card, Input } from '@nextui-org/react';

const UserSignUp = () => {
  const email = useRef();
  const password = useRef();

  const auth = getAuth();
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUp = () => {
    setEmailError('');
    setPasswordError('');
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);

        const initialMessage = error.code.replaceAll('-', ' ').replace('auth/', '');
        const errorMessage = initialMessage.charAt(0).toUpperCase() + initialMessage.slice(1) + '.';

        if (error.code.includes('password')) {
          setPasswordError(errorMessage);
        } else {
          setEmailError(errorMessage);
        }
      });
  };
  return (
    <section className="max-w-[60rem]">
      <Card className="sign-up-container p-6 my-3">
        <div className="flex flex-col items-center gap-4">
          <div className="text-xl">Create Account</div>
          <div className="flex w-full flex-col md:flex-row gap-4">
            <Input
              ref={email}
              isRequired={true}
              variant="bordered"
              label="Email"
              type="email"
              placeholder="Enter Your Email"
              errorMessage={emailError}
            />
            <Input
              ref={password}
              isRequired={true}
              variant="bordered"
              label="Password"
              type="password"
              placeholder="Enter Your Password"
              errorMessage={passwordError}
            />
          </div>
          <Button color="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default UserSignUp;
