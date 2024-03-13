# Bruin Dictionary

![Local Image](src/assets/color_logo.svg)

/bɹuːɪn dɪkʃənɛɹi/

CS 35L: Software Construction Winter 2024 Project <br> Professor Eggert

Bruin Dictionary is a crowdsourced online dictionary for UCLA students and alumni, defining the many acronyms, slang words, and time-honored traditions associated with being a Bruin. Inspired by the functionality of Urban Dictionary, users can use Bruin Dictionary to search and contribute definitions.

## Our Team

[Anthony Williams](https://www.linkedin.com/in/awilliamsworks/) - Class of 2025, Computer Science

[Khanh Nguyen](https://www.linkedin.com/in/khanh-nguyen-794062230/) - Class of 2025, Computer Science and Linguistics

[Raina Wan](https://www.linkedin.com/in/raina-wan-profile/) - Class of 2025, Computer Science and Linguistics

[Soyeon Kim](https://www.linkedin.com/in/sonya-kim/) - Class of 2025, Computer Science and Linguistics

[Tiana Ly](https://www.linkedin.com/in/tianaly/) - Class of 2025, Computer Science and Linguistics

William Wong - Class of 2026, Computer Science

## Run Project

1. In the terminal, run the following commands:

```bash
git clone https://github.com/rainawan/BruinDictionary.git
```

```bash
cd BruinDictionary
```

2. Create `.env.local` in root and add environment variables:

```
VITE_FIREBASE_KEY='firebase-api-key'
VITE_FIREBASE_APP_ID='firebase-app-id'
```

3. In the terminal, run the following commands to start the project:

```bash
yarn install
```

```bash
yarn start
```

## Features

**1. Search**

- Users can meaningfully search through server-side data for a term and its definitions
- Users can enter a query conveniently through front-end search bar
- Search can also be done by URL manipulation

<br>

**2. Post**

- App uploads data from the client to the back-end by collecting string input from user to post definitions
- App displays dynamic data by updating each time users post

<br>

**3. Like/Dislike**

- Users have the option to like or dislike each post once

<br>

**4. Sort**

- Sort by Most Recent
- Sort by Most Liked

<br>

**5. Authentication**

<br>

## Website Experience

## Tools Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Firebase](https://firebase.google.com/)
- [Tailwind](https://tailwindcss.com/)
- [NextUI](https://nextui.org/)
- [Ant Design Icon](https://ant.design/components/icon/)
- [Sonner](https://sonner.emilkowal.ski/)
- [Figma](https://www.figma.com/)
