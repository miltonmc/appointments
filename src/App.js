import React, { Component } from 'react';
import firebase from "firebase";
import Loading from "shared/Loading";
import Login from "authentication/Login";
import LogoutButton from "authentication/LogoutButton";

class App extends Component {
  constructor(props) {
    super(props);

    this.auth = firebase.auth();
    this.auth.onAuthStateChanged(this.handleAuthStateChanged);
    this.state = {
      loading: true
    };
  }
  render() {
    const { loading, user } = this.state;
    if (loading) return <Loading />;

    return user ? <LogoutButton /> : <Login />;
  }

  handleAuthStateChanged = user => {
    this.setState({
      loading: false,
      user: user
    });
  };
}

export default App;
