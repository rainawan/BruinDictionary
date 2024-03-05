import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, Card, Input } from '@nextui-org/react';

const UserSignUp = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/user');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className="max-w-[60rem]">
      <Card className="sign-up-container p-6 my-3">
        <form id="signup-form" onSubmit={handleSignUp}>
          <div className="flex flex-col items-center gap-4">
            <div className="text-xl">Create Account</div>
            <div className="flex w-full flex-col md:flex-row gap-4">
              <Input
                isRequired
                variant="bordered"
                name="email"
                type="email"
                label="Email"
                placeholder="Enter Your Email"
              />
              <Input
                isRequired
                variant="bordered"
                name="password"
                type="password"
                label="Password"
                placeholder="Enter Your Password"
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
