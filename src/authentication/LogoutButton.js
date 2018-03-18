import React from 'react';
import * as firebase from 'firebase';
import { Button } from 'semantic-ui-react';

const handleLogout = () => {
  firebase.auth().signOut();
};

export default () => {

  return (
    <Button onClick={handleLogout} floated="right">
      Sair
    </Button>
  );
};
