import React from 'react';
import * as firebase from 'firebase';
import { Button, Image, Item, Popup } from 'semantic-ui-react';

const handleLogout = () => {
  firebase.auth().signOut();
};

export default () => {
  const user = firebase.auth().currentUser;

  return (
    <Popup
      on="click"
      size="large"
      trigger={
        <Image circular bordered size="mini" src={user.photoURL} />
      }
      offset={5}
    >
      <Item.Group>
        <Item style={{ width: '350px'}}>
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
