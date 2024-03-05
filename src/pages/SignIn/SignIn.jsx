import UserSignIn from './components/UserSignIn';
import GoogleSignInButton from './components/GoogleSignInButton';
import FacebookSignInButton from './components/FacebookSignInButton';
// import UserSignUp from '../../components/UserSignUp';
import Text from '../../components/Text';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <section className="Login">
      <Text h1 className="font-semibold p-5 pt-10">
        Log In
      </Text>
      <div className="flex w-[400px] mx-auto flex-col flex-wrap mb-6 md:mb-0 mt-6 md:mt-2 gap-4">
        <GoogleSignInButton />
        <FacebookSignInButton />
        <UserSignIn />
        <Link to="/user/create" className="font-bold text-lg text-primary hover:text-gray-300">
          Create Account
        </Link>
      </div>
    </section>
  );
};

export default SignIn;
