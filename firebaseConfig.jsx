// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
//import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB31JxaNkT9BCU6jbJWs0P3J3X5wAKRXpQ',
  authDomain: 'tiangero-b093f.firebaseapp.com',
  projectId: 'tiangero-b093f',
  storageBucket: 'tiangero-b093f.appspot.com',
  messagingSenderId: '611836056966',
  appId: '1:611836056966:web:03746e220f9218f2e5c807',
  measurementId: 'G-JZXE4HNZZ6',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app)
