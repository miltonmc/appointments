import React, { Component } from 'react';
import { withFirestore } from 'react-firestore';
import Item from './Item.js';
import FirestorePath from 'shared/FirestorePath';

class EditItem extends Component {
  state = {};

  handleSubmit = (fullPath, id, cnpj, name) => {
    const { firestore, onClose } = this.props;
    firestore
      .doc(`${fullPath}/${id}`)
      .update({ name })
      .then(() => onClose('Convênio atualizado com sucesso.'))
      .catch((error) => {
        this.setState({
          errorMessage: error,
        });
      });
  };

  render() {
    const { errorMessage } = this.state;
    const { item, onClose } = this.props;
    return (
      <FirestorePath
        path="HealthPlans"
        render={(fullPath) => (
          <Item
            title="Convênio"
            {...item}
            errorMessage={errorMessage}
            onSubmit={(...props) => this.handleSubmit(fullPath, ...props)}
            onClose={onClose}
          />
        )}
      />
    );
  }
}

export default withFirestore(EditItem);
