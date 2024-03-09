import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../utils/firebase';
import { Button } from '@nextui-org/react';
import Facebook from '../../../assets/facebook.svg';

const FacebookSignInButton = () => {
  const userSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button color="default" size="md" onClick={userSignIn} style={{ padding: '10px' }}>
      <img src={Facebook} alt="" style={{ width: '20px', height: '20px' }} />
      Continue With Facebook
    </Button>
  );
};

export default FacebookSignInButton;
