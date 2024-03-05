import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, Card, Input } from '@nextui-org/react';
import Text from '../../components/Text';

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
      <div className="flex flex-col items-center gap-4">
        <Text h1 className="font-semibold p-5">
          Create Account
        </Text>
        <div className="flex w-[400px] mx-auto flex-col flex-wrap mb-6 md:mb-0 gap-4">
          <Input
            label="Email"
            size="md"
            variant="bordered"
            isRequired={true}
            ref={email}
            type="email"
            placeholder="Enter Your Email"
          />
          <Input
            label="Password"
            size="md"
            variant="bordered"
            isRequired={true}
            ref={password}
            type="password"
            placeholder="Enter Your Password"
          />
        </div>
        <Button color="primary" onClick={handleSignUp}>
          Sign Up
        </Button>
      </div>
    </section>
  );
};

export default UserSignUp;
