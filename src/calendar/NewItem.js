import React, { Component } from 'react';
import { withFirestore } from 'react-firestore';
import FirestorePath from '../components/FirestorePath';
import Item from './Item';

class NewItem extends Component {
  state = {};

  handleSubmit = (fullPath, { id, ...event }) => {
    const { firestore, onClose } = this.props;

    if (!event || !event.customer || !event.customer.id) {
      this.setState({ errorMessage: 'O campo cliente deve ser preenchido!' });
      return;
    }

    if (id) {
      firestore
        .doc(`${fullPath}/${id}`)
        .set(event)
        .then(() => onClose('Evento alterado com sucesso.'))
        .catch((errorMessage) => this.setState({ errorMessage }));
    } else {
      firestore
        .collection(`${fullPath}`)
        .add(event)
        .then(() => onClose('Evento criado com sucesso.'))
        .catch((errorMessage) => this.setState({ errorMessage }));
    }
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <FirestorePath
        path="Events"
        render={(fullPath) => (
          <Item
            title="Novo Evento"
            isNew
            errorMessage={errorMessage}
            onSubmit={(event) => this.handleSubmit(fullPath, event)}
            {...this.props}
          />
        )}
      />
    );
  }
}

export default withFirestore(NewItem);
