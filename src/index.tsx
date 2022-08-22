import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import * as firebase from 'firebase/app'
import { getStorage } from 'firebase/storage'


// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBg3Txlu4Hp7rde5XSSryhi0q8o1LqB7K0',
  authDomain: 'social-media-diplom.firebaseapp.com',
  projectId: 'social-media-diplom',
  storageBucket: 'social-media-diplom.appspot.com',
  messagingSenderId: '901067721628',
  appId: '1:901067721628:web:b9a1afe64b996351b41659'
}
const app = firebase.initializeApp(firebaseConfig)
export const storage = getStorage(app)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
