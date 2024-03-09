# Bruin Dictionary
/bɹuːɪn dɪkʃənɛɹi/

CS 35L: Software Construction Winter 2024 Project <br> Professor Eggert

Bruin Dictionary is a crowdsourced online dictionary for UCLA students and alumni, defining the many acronyms, slang words, and time-honored traditions associated with being a Bruin. Inspired by the functionality of Urban Dictionary, users can use Bruin Dictionary to search and contribute definitions.

# Features
1. Search
2. Post
3. Like/Dislike
4. Sort

# Our Team
[Anthony Williams](https://www.linkedin.com/in/awilliamsworks/) - Class of 2025, Computer Science <br>
[Khanh Nguyen](https://www.linkedin.com/in/khanh-nguyen-794062230/) - Class of 2025, Computer Science and Linguistics <br>
[Raina Wan](https://www.linkedin.com/in/raina-wan-profile/) - Class of 2025, Computer Science and Linguistics <br>
[Soyeon Kim](https://www.linkedin.com/in/sonya-kim/) - Class of 2025, Computer Science and Linguistics <br>
[Tiana Ly](https://www.linkedin.com/in/tianaly/) - Class of 2025, Computer Science and Linguistics <br>
William Wong - Class of 2026, Computer Science

# Run Project
1. In terminal, run the following commands:
<pre>
git clone https://github.com/sonyakim-dev/YouBelong.git
cd YouBelong
</pre>
2. Add Firebase config file as firebase.js in utils:
<pre>
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: 'bruindictionary.firebaseapp.com',
  databaseURL: 'https://bruindictionary-default-rtdb.firebaseio.com',
  projectId: 'bruindictionary',
  storageBucket: 'bruindictionary.appspot.com',
  messagingSenderId: '738006961696',
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: 'G-109P7XELC8'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
</pre>
3. Add environment variables as .env.local in root:
<pre>
VITE_FIREBASE_KEY='your firebase key'
VITE_FIREBASE_APP_ID='your firebase app id'
</pre>
4. In terminal, run the following commands: 
<pre>
yarn install
yarn start
</pre>

# Website Experience
