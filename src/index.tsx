import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as firebase from 'firebase/app'




// Your web app's Firebase configuration


// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBg3Txlu4Hp7rde5XSSryhi0q8o1LqB7K0",
  authDomain: "social-media-diplom.firebaseapp.com",
  projectId: "social-media-diplom",
  storageBucket: "social-media-diplom.appspot.com",
  messagingSenderId: "901067721628",
  appId: "1:901067721628:web:b9a1afe64b996351b41659"
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
