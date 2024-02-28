import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, Card, Input } from '@nextui-org/react';

const UserSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
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
      <Card className="sign-up-container p-6 m-3">
        <form onSubmit={handleSignUp}>
          <div className="flex flex-col items-center gap-4">
            <div className="text-xl">Create Account</div>
            <div className="flex w-full flex-nowrap gap-4">
              <Input
                fullWidth={false}
                label="Email"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button color="primary" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default UserSignUp;
