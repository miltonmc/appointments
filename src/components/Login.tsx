import firebase from 'firebase/app';
import 'firebase/auth';
import React, { FunctionComponent } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import appConfig from '../appConfig';
import logo from '../logo.svg';
import Center from './Center';
import LoginWithEmail from './LoginWithEmail';

const handleGoogleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

const Login: FunctionComponent<LoginProps> = ({ error }) => (
  <Center>
    <div className="login">
      <img alt={appConfig.fullName} src={logo} />
      <h1 className="login__title">{appConfig.fullName}</h1>
      <Button.Group size="huge">
        <Button color="google plus" onClick={handleGoogleLogin}>
          <Icon name="google" /> Autenticar com Google
        </Button>
        <Button.Or text="ou" />
        <LoginWithEmail />
      </Button.Group>
      {error && <p className="login__error">{error}</p>}
    </div>
  </Center>
);

export default Login;

interface LoginProps {
  error?: string;
}
