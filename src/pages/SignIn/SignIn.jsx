import UserSignIn from './components/UserSignIn';
import GoogleSignInButton from './components/GoogleSignInButton';
import FacebookSignInButton from './components/FacebookSignInButton';
import UserSignUp from '../../components/UserSignUp';

const SignIn = () => {
  return (
    <section className="Login">
      <h1>Log In</h1>
      <div className="flex w-[400px] mx-auto flex-col flex-wrap mb-6 md:mb-0 mt-6 md:mt-2 gap-4">
        <GoogleSignInButton />
        <FacebookSignInButton />
        <UserSignIn />
        <UserSignUp />
      </div>
    </section>
  );
};

export default SignIn;
