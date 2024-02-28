import UserSignIn from './components/UserSignIn';
import GoogleSignInButton from './components/GoogleSignInButton';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <section className="Login">
      <h1>Log In</h1>
      <GoogleSignInButton />
      <UserSignIn />
      <Link to="/user/create" className="font-bold text-lg text-primary hover:text-gray-300">
        Create Account
      </Link>
    </section>
  );
};

export default SignIn;
