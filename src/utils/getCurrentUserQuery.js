import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { useFirestoreDocumentData } from '@react-query-firebase/firestore';
import { db, auth } from './firebase';

const getCurrentUserDocument = () => {
  const [currentUserDoc, setCurrentUserDoc] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, obtain the document for the current user
        const docRef = doc(db, 'Users', user.uid);
        const queryKey = ['Users', user.uid];
        const document = useFirestoreDocumentData(
          queryKey,
          docRef,
          { subscribe: true },
          {
            select: (data) => (data.exists() ? { id: data.id, ...data.data() } : null)
          }
        );
        setCurrentUserDoc(document);
      } else {
        // User is signed out
        setCurrentUserDoc(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return currentUserDoc;
};

export default getCurrentUserDocument;
