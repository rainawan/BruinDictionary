import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { query, getDocs, where, collection } from 'firebase/firestore';
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { db, auth } from '../../../utils/firebase';
import { Button } from '@nextui-org/react';
import Facebook from '../../../assets/facebook.svg';
import { useState } from 'react';

const FacebookSignInButton = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const usersCollectionRef = collection(db, 'Users');
  const mutation = useFirestoreCollectionMutation(usersCollectionRef);

  const userSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);

      const usersQuery = query(usersCollectionRef, where('email', '==', user.email));
      const querySnapshot = await getDocs(usersQuery);

      if (querySnapshot.empty) {
        // No existing user document with this email, create a new one
        mutation.mutate({
          accountCreated: new Date(),
          dislikes: {},
          email: user.email,
          likes: {},
          username: '' // Consider how to set or update username
        });
      } else {
        // User document with this email already exists
        console.log('User already exists with this email.');
      }
    } catch (error) {
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
      console.error('Error during Facebook sign-in:', errorMessage);
    }
  };

  return (
    <>
      <Button color="default" size="md" onClick={userSignIn} style={{ padding: '10px' }}>
        <img src={Facebook} alt="" style={{ width: '20px', height: '20px' }} />
        Continue With Facebook
      </Button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </>
  );
};
