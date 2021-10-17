import firebase from 'firebase/compat/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { FirestoreProvider } from 'react-firestore';
import App from './App';
import './application.scss';
import firebaseConfig from './firebaseConfig';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <FirestoreProvider firebase={firebase}>
    <App />
  </FirestoreProvider>,
  document.getElementById('root')
);
serviceWorker.unregister();
