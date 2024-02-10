import SignIn from './SignIn';
import SignUp from './SignUp';
import AuthInfo from './AuthInfo';
import GoogleSignIn from '../GoogleSignIn';
import SignOutButton from '../SignOutButton';

const Login = () => {
  return (
    <div className="Login">
      <h1>Log In</h1>
      <GoogleSignIn></GoogleSignIn>
      <SignOutButton></SignOutButton>
      <SignIn></SignIn>
      <SignUp></SignUp>
      <AuthInfo></AuthInfo>
    </div>
  );
};

export default Login;
