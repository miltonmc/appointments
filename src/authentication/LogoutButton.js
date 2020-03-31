import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Button, Image, Item, Popup } from 'semantic-ui-react';

const handleLogout = () => {
  firebase.auth().signOut();
};

export default () => {
  const user = firebase.auth().currentUser;
  const initials = (user.displayName
    ? user.displayName
        .split(' ')
        .map((name) => name.substring(0, 1))
        .join('')
    : user.email.substring(0, 1)
  ).toUpperCase();
  const avatar = user.photoURL ? (
    <Image circular bordered size="mini" src={user.photoURL} />
  ) : (
    <svg viewBox="0 0 24 24" height="32px">
      <circle fill="#a0d36a" cx="12" cy="12" r="12"></circle>
      <text fill="#ffffff" font-size="12" text-anchor="middle" x="12" y="16">
        {initials}
      </text>
    </svg>
  );

  return (
    <Popup on="click" size="large" position="top right" trigger={avatar} offset={5}>
      <Item.Group>
        <Item style={{ width: '350px' }}>
          <Item.Image size="tiny" src={user.photoURL} />
          <Item.Content>
            <Item.Header>{user.displayName}</Item.Header>
            <Item.Meta>{user.email}</Item.Meta>
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
