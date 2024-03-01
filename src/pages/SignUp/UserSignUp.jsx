import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, Card, Input } from '@nextui-org/react';

const UserSignUp = () => {
  const email = useRef();
  const password = useRef();

  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
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
              label="Email"
              type="email"
              placeholder="Enter Your Email"
            />
            <Input
              ref={password}
              isRequired={true}
              label="Password"
              type="password"
              placeholder="Enter Your Password"
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
