import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, Card, Input } from '@nextui-org/react';

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
        navigate('/');
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
    <section className="max-w-[55rem]">
      <Card className="p-6 my-3">
        <form id="signup-form" onSubmit={handleSignUp}>
          <div className="flex flex-col items-center gap-4">
            <div className="text-xl">Create Account</div>
            <div className="flex w-full flex-col md:flex-row gap-4">
              <Input
                isRequired
                variant="bordered"
                label="Email"
                name="email"
                type="email"
                placeholder="Enter Your Email"
                errorMessage={emailError}
                isInvalid={emailError !== ''}
                onValueChange={() => setEmailError('')}
              />
              <Input
                isRequired
                variant="bordered"
                label="Password"
                name="password"
                type="password"
                placeholder="Enter Your Password"
                errorMessage={passwordError}
                isInvalid={passwordError !== ''}
                onValueChange={() => setPasswordError('')}
              />
            </div>
            <Button color="primary" type="submit" name="submit">
              Sign Up
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default UserSignUp;
