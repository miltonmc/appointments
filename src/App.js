import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Loading from 'shared/Loading';
import Login from 'authentication/Login';
import LoggedApp from 'LoggedApp';

export default function App() {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    async function validateGoogleUser(user) {
      let errorMsg;
      try {
        const snapshot = await firebase
          .firestore()
          .collection('AllowedGoogleUsers')
          .where('email', '==', user.email)
          .get();
        errorMsg = snapshot.empty ? `Email (${user.email}) sem permissão de acesso.` : null;
      } catch (e) {
        errorMsg = e.message;
      }
      return errorMsg;
    }

    async function handleAuthStateChanged(user) {
      const newState = { loading: false, loggedUser: user, error: null };
      if (user?.providerData?.some((provider) => provider?.providerId === 'google.com')) {
        newState.error = await validateGoogleUser(user);
        if (newState.error) {
          newState.loggedUser = null;
        }
      }
      setState(newState);
    }

    firebase.auth().onAuthStateChanged(handleAuthStateChanged);
  }, []);

  const { error, loading, loggedUser } = state;
  if (loading) return <Loading />;
  else if (loggedUser) return <LoggedApp />;
  else return <Login error={error} />;
}
