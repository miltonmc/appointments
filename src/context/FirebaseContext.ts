import firebase from 'firebase/compat/app';
import React from 'react';

export interface Context {
  loggedUser: firebase.UserInfo;
  firestorePath: string;
}

const defaultValue = {
  loggedUser: {
    displayName: null,
    email: null,
    phoneNumber: null,
    photoURL: null,
    providerId: '',
    uid: '',
  },
  firestorePath: '',
};

const FirebaseContext = React.createContext<Context>(defaultValue);

export default FirebaseContext;
