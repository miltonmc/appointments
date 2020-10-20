import firebase from 'firebase/app';
import 'firebase/auth';
import React, { FunctionComponent } from 'react';
import { Button, Image, Item, Popup } from 'semantic-ui-react';

const handleLogout = () => {
  firebase.auth().signOut();
};

const LogoutButton: FunctionComponent = () => {
  const { displayName, email, photoURL } = firebase.auth().currentUser ?? {};
  const avatar = photoURL ? (
    <Image circular bordered size="mini" src={photoURL} />
  ) : (
    <svg viewBox="0 0 24 24" height="32px">
      <circle fill="#a0d36a" cx="12" cy="12" r="12"></circle>
      <text fill="#ffffff" font-size="12" text-anchor="middle" x="12" y="16">
        {displayName
          ?.split(' ')
          .map((name) => name.substring(0, 1))
          .join('') || email?.substring(0, 1).toUpperCase()}
      </text>
    </svg>
  );

  return (
    <Popup on="click" size="large" position="top right" trigger={avatar} offset={[5, 0]}>
      <Item.Group>
        <Item style={{ width: '350px' }}>
          <Item.Image size="tiny" src={photoURL} />
          <Item.Content>
            <Item.Header>{displayName}</Item.Header>
            <Item.Meta>{email}</Item.Meta>
            <Item.Extra>
              <Button onClick={handleLogout} floated="right">
                Sair
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Popup>
  );
};

export default LogoutButton;
