import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import React, { useEffect, useState } from 'react';
import Loading from './components/Loading';
import Login from './components/Login';
import FirebaseContext, { Context } from './context/FirebaseContext';
import LoggedApp from './LoggedApp';

interface AppState {
  context?: Context;
  error?: string;
  loading: boolean;
}

const isAllowedUsers = async (user: firebase.UserInfo): Promise<boolean> => {
  const snapshot = await firebase.firestore().collection('AllowedGoogleUsers').where('email', '==', user.email).get();
  return snapshot.empty;
};

export default function App() {
  const [{ context, error, loading }, setState] = useState<AppState>({ loading: true });

  const handleAuthStateChanged = async (loggedUser: firebase.User | null) => {
    const state: AppState = { loading: false };
    try {
      if (
        loggedUser?.providerData?.some((provider) => provider?.providerId === 'google.com') &&
        (await isAllowedUsers(loggedUser))
      ) {
        state.error = `Email (${loggedUser.email}) sem permissão de acesso.`;
      }
    } catch (e) {
      state.error = (e as Error).message;
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
