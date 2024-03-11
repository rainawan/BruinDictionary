import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { query, getDocs, where, collection } from 'firebase/firestore';
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { db, auth } from '../../../utils/firebase';
import { Button } from '@nextui-org/react';
import Google from '../../../assets/google.svg';
import { useState } from 'react';

const GoogleSignInButton = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const usersCollectionRef = collection(db, 'Users');
  const mutation = useFirestoreCollectionMutation(usersCollectionRef);

  const userSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Query the Users collection for a document with the matching email
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
      console.error('Error during Google sign-in:', errorMessage);
    }
  };

  return (
    <>
      <Button className="p-5" color="default" size="md" onClick={userSignIn}>
        <img src={Google} alt="google logo" style={{ width: '20px', height: '20px' }} />
        Continue With Google
      </Button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </>
  );
};

export default GoogleSignInButton;
