import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "semantic-ui-css/semantic.min.css";
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from "firebase";
import firebaseConfig from "firebaseConfig.js";
import { FirestoreProvider } from "react-firestore";

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <FirestoreProvider firebase={firebase}>
    <App />
  </FirestoreProvider>
  , document.getElementById('root'));
registerServiceWorker();
