import firebase from 'firebase/compat/app';
import { createRoot } from 'react-dom/client';
import { FirestoreProvider } from 'react-firestore';
import App from './App';
import './application.scss';
import firebaseConfig from './firebaseConfig';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp(firebaseConfig);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <FirestoreProvider firebase={firebase}>
    <App />
  </FirestoreProvider>
);
serviceWorker.unregister();
