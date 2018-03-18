import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "semantic-ui-css/semantic.min.css";
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from "firebase";
import firebaseConfig from "firebaseConfig.js";

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
