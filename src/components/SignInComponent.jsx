import SignIn from '../components/UserSignIn';
import SignUp from '../components/UserSignUp';
import GoogleSignIn from '../components/GoogleSignIn';

const SignInComponent = () => {
  return (
    <div className="Login">
      <h1>Log In</h1>
      <GoogleSignIn></GoogleSignIn>
      <SignIn></SignIn>
      <SignUp></SignUp>
    </div>
  );
};

export default SignInComponent;
