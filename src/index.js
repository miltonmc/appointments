import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import firebaseConfig from 'firebaseConfig.js';
import { FirestoreProvider } from 'react-firestore';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <FirestoreProvider firebase={firebase}>
    <App />
  </FirestoreProvider>,
  document.getElementById('root')
);
serviceWorker.unregister();
