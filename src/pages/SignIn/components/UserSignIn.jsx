import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../../utils/firebase';
import { Input, Button } from '@nextui-org/react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { db } from '../../../utils/firebase';

const UserSignIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const usersCollectionRef = collection(db, 'Users');
  const mutation = useFirestoreCollectionMutation(usersCollectionRef);

  const toggleVisibility = () => setIsVisible((isVisible) => !isVisible);

  const signIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    setErrorMessage('');

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      // Check if the user document exists
      const docRef = doc(db, 'Users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Document doesn't exist, create a new one
        mutation.mutate({
          accountCreated: new Date(),
          dislikes: {},
          email: email,
          likes: {},
          username: ''
        });
      }
    } catch (error) {
      const message = error.message.replaceAll('-', ' ').replace('auth/', '');
      setErrorMessage(message.charAt(0).toUpperCase() + message.slice(1));
    }
  };

  const handleInputClick = () => {
    setErrorMessage('');
  };

  return (
    <div>
      <form id="signin-form" onSubmit={signIn}>
        <div className="flex flex-col gap-4">
          <Input
            label="Email"
            name="email"
            type="email"
            size="md"
            variant="bordered"
            isRequired
            onFocus={handleInputClick}
            isInvalid={errorMessage.length > 0}
            color={errorMessage.length ? 'danger' : 'default'} // text color of "email"
          />
          <Input
            label="Password"
            name="password"
            size="md"
            variant="bordered"
            isRequired
            isInvalid={errorMessage.length > 0}
            color={errorMessage.length ? 'danger' : 'default'}
            onFocus={handleInputClick}
            type={isVisible ? 'text' : 'password'}
            endContent={
              <div className="m-auto mr-1 cursor-pointer" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeInvisibleFilled className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilled className="text-2xl text-default-400 pointer-events-none" />
                )}
              </div>
            }
          />
          {errorMessage ? <p className="text-left text-[#f31260]">{errorMessage}</p> : null}
          <Button type="submit" color="primary">
            Continue With Email
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserSignIn;
