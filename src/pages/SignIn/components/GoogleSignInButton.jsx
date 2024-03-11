import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { db, auth } from '../../../utils/firebase';
import { Button } from '@nextui-org/react';
import Google from '../../../assets/google.svg';
import { useState } from 'react';

const GoogleSignInButton = () => {
  const [errorMessage, setErrorMessage] = useState('');
  // Initialize the Firestore collection mutation
  const usersCollectionRef = collection(db, 'Users');
  const mutation = useFirestoreCollectionMutation(usersCollectionRef);

  const userSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user document already exists
      const userDocRef = doc(db, 'Users', user.uid);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        // Document doesn't exist, so create a new one
        mutation.mutate({
          accountCreated: new Date(),
          dislikes: {},
          email: user.email,
          likes: {},
          username: ''
        });
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
