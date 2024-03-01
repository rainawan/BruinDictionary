import UserSignIn from './components/UserSignIn';
import GoogleSignInButton from './components/GoogleSignInButton';
import UserSignUp from '../../components/UserSignUp';

const SignIn = () => {
  return (
    <section className="Login">
      <h1>Log In</h1>
      <GoogleSignInButton />
      <UserSignIn />
      <UserSignUp />
    </section>
  );
};

export default SignIn;
