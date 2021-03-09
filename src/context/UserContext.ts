import firebase from 'firebase/app';
import React from 'react';

const defaultValue = { uid: '' } as firebase.User;

const UserContext = React.createContext<firebase.User>(defaultValue);

export default UserContext;
