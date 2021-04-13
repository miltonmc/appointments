import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Loading from './components/Loading';
import Login from './components/Login';
import FirebaseContext from './context/FirebaseContext';
import LoggedApp from './LoggedApp';

const isAllowedUsers = async (user) => {
  const snapshot = await firebase.firestore().collection('AllowedGoogleUsers').where('email', '==', user.email).get();
  return snapshot.empty;
};

export default function App() {
  const [{ context, error, loading }, setState] = useState({ loading: true });

  const handleAuthStateChanged = async (loggedUser) => {
    const state = { loading: false };
    try {
      if (
        loggedUser?.providerData?.some((provider) => provider?.providerId === 'google.com') &&
        (await isAllowedUsers(loggedUser))
      ) {
        state.error = `Email (${loggedUser.email}) sem permissão de acesso.`;
      }
    } catch (e) {
      state.error = e.message;
    }

    if (loggedUser && !state.error) {
      state.context = {
        firestorePath: `/Users/${loggedUser.uid}`,
        loggedUser,
      };
    }

    setState(state);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(handleAuthStateChanged);
  }, []);

  if (loading) return <Loading />;

  return context ? (
    <FirebaseContext.Provider value={context}>
      <LoggedApp />
    </FirebaseContext.Provider>
  ) : (
    <Login error={error} />
  );
}
