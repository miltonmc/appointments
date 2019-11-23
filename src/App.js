import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Loading from "shared/Loading";
import Login from "authentication/Login";
import LoggedApp from "LoggedApp";

class App extends Component {
  constructor(props) {
    super(props);

    firebase.auth().onAuthStateChanged(this.handleAuthStateChanged);
    this.firestore = firebase.firestore();
    this.state = {
      loading: true,
      errorMessage: null
    };
  }

  render() {
    const { loading, user, error } = this.state;
    if (loading) return <Loading />;

    return user ? <LoggedApp /> : <Login error={error} />;
  }

  handleAuthStateChanged = user => {
    const promise = (user && user.providerData && user.providerData[0] && user.providerData[0].providerId === 'google.com')
      ? this.validateGoogleUser(user)
      : Promise.resolve({ user });

    promise.then(value => this.setState({ loading: false, ...value }));
  };

  validateGoogleUser = (user) => {
    return this.firestore.collection('AllowedGoogleUsers').where('email', '==', user.email).get()
      .then(snapshot => snapshot.empty ? { error: `Email (${user.email}) sem permissão de acesso.` } : { user })
      .catch(error => ({ error: error.message }));
  }
}

export default App;
