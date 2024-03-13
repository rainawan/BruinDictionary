import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, Input } from '@nextui-org/react';
import Text from '../../components/Text';

const UserSignUp = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    setEmailError('');
    setPasswordError('');

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/User');
      })
      .catch((error) => {
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
    <section>
      <form id="signup-form" onSubmit={handleSignUp}>
        <div className="flex flex-col max-w-[400px] mx-auto gap-4 pt-10">
          <Text h2 className="font-semibold p-5">
            Create Account
          </Text>
          <div className="flex flex-col w-full gap-4">
            <Input
              isRequired={true}
              variant="bordered"
              label="Email"
              name="email"
              type="email"
              size="md"
              placeholder="Enter Your Email"
              errorMessage={emailError}
              isInvalid={emailError !== ''}
              onValueChange={() => setEmailError('')}
            />
            <Input
              isRequired={true}
              variant="bordered"
              label="Password"
              name="password"
              type="password"
              size="md"
              placeholder="Enter Your Password"
              errorMessage={passwordError}
              isInvalid={passwordError !== ''}
              onValueChange={() => setPasswordError('')}
            />
          </div>
          <Button color="primary" type="submit" name="submit">
            Sign Up
          </Button>
          <p>
            {' '}
            Already have an account?{' '}
            <Link
              to="/user"
              className="font-bold text-md dark:text-gray-300 hover:text-primary hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default UserSignUp;
