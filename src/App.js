import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Loading from 'shared/Loading';
import Login from 'authentication/Login';
import LoggedApp from 'LoggedApp';

export default function App() {
  const [context, setContext] = useState({ loading: true });
  
  useEffect(() => {
    async function validateGoogleUser(user) {
      
      let errorMsg;
      try {
        const snapshot = await firebase.firestore()
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
      const context = { loading: false, user, error: null };
      if (user?.providerData?.some(provider => provider?.providerId === 'google.com')) {
        context.error = await validateGoogleUser(user)
        if (context.error) {
          context.user = null;
        }
      }
      setContext(context);
    }

    firebase.auth().onAuthStateChanged(handleAuthStateChanged);
  }, []);
  
  const { error, loading, user } = context;
  if (loading)
   return <Loading />;
  else if (user)
    return <LoggedApp />;
  else
    return <Login error={error} />;
}
