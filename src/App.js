import React, { Component } from 'react';
import firebase from "firebase";
import "firebase/firestore";
import Loading from "shared/Loading";
import Login from "authentication/Login";
import LogoutButton from "authentication/LogoutButton";

class App extends Component {
  constructor(props) {
    super(props);

    this.auth = firebase.auth();
    this.allowedGoogleUsers = [];
    this.db = firebase.firestore();
    this.auth.onAuthStateChanged(this.handleAuthStateChanged);
    this.state = {
      loading: true,
      errorMessage: null
    };
  }


  render() {
    const { loading, user, error } = this.state;
    if (loading) return <Loading />;

    return user ? <LogoutButton /> : <Login error={error} />;
  }

  handleAuthStateChanged = user => {
    if (user && user.providerData[0].providerId === 'google.com') {
      this.validateGoogleUser(user);
    } else {
      this.setState({
        loading: false,
        user: user
      });
    }
  };

  validateGoogleUser = (user) => {
    this.db.collection("allowed_google_users").get().then((querySnapshot) => {
      const allowedGoogleUsers = [];
      querySnapshot.forEach((doc) => {
        allowedGoogleUsers.push(doc.data().email);
      });

      if (!allowedGoogleUsers.includes(user.email)) {
        const errorMessage = `Email (${user.email}) sem permissão de acesso.`;
        this.setState({
          loading: false,
          error: errorMessage
        });
      } else {
        this.setState({
          loading: false,
          user: user
        });
      }
    });
  }
}

export default App;
