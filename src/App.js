import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Loading from './components/Loading';
import Login from './components/Login';
import UserContext from './context/UserContext';
import LoggedApp from './LoggedApp';

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
      const error =
        user?.providerData?.some((provider) => provider?.providerId === 'google.com') &&
        (await validateGoogleUser(user));
      setState({ loading: false, user: error ? null : user, error });
    }

    firebase.auth().onAuthStateChanged(handleAuthStateChanged);
  }, []);

  const { error, loading, user } = state;
  if (loading) return <Loading />;

  return user ? (
    <UserContext.Provider value={user}>
      <LoggedApp />
    </UserContext.Provider>
  ) : (
    <Login error={error} />
  );
}
