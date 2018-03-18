import React from "react";
import logo from "logo.svg";
import "./Login.css";
import Center from "shared/Center";
import * as firebase from "firebase";
import appConfig from "../appConfig";
import { Button, Icon } from 'semantic-ui-react';

const handleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

const Login = ({ error }) =>
  <Center>
    <div className="login">
      <img alt={appConfig.fullName} src={logo} />
      <h1 className="login__title">
        {appConfig.fullName}
      </h1>
      <Button.Group size="huge">
        <Button color='google plus' onClick={handleLogin}>
          <Icon name='google' /> Autenticar com Google
        </Button>
        <Button.Or text="ou" />
        <Button onClick={handleLogin}>
        <Icon name='mail' /> Autenticar com Email
        </Button>
      </Button.Group>

      {error
        ? <p className="login__error">
            {error}
          </p>
        : ""}
    </div>
  </Center>;

export default Login;
