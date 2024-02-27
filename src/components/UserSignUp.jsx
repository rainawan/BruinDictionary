import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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
    <div className="sign-up-container">
      <form onSubmit={handleSignUp}>
        <h1>Create Account</h1>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}></input>
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default UserSignUp;
