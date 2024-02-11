import useCurrentUserData from '../utils/useCurrentUserData';
import SignInButton from '../components/SignInButton';
import SignOutButton from '../components/SignOutButton';

const Login = () => {
  const { userData, setUserData } = useCurrentUserData();

  return (
    <section className="Login">
      <p>Name: {userData?.username ?? 'None'}</p>
      <SignInButton></SignInButton>
      <SignOutButton></SignOutButton>
    </section>
  );
};

export default Login;
