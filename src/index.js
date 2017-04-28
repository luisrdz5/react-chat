import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import firebase from 'firebase';


firebase.initializeApp({
    apiKey: "AIzaSyAfkrE79iRsrc9zxtRfn7Q0mj_LRPpTGnc",
    authDomain: "chatreactfirebase.firebaseapp.com",
    databaseURL: "https://chatreactfirebase.firebaseio.com",
    projectId: "chatreactfirebase",
    storageBucket: "chatreactfirebase.appspot.com",
    messagingSenderId: "464156444060"
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
