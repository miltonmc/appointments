import React, { Component } from 'react';
import { withFirestore } from 'react-firestore';
import Item from './Item.js';
import { validate } from 'cnpj';
import FirestorePath from 'shared/FirestorePath';

class NewItem extends Component {
  state = {};
  handleSubmit = (fullPath, id, cnpj, name) => {
    if (!validate(cnpj)) {
      this.setState({
        errorMessage: 'CNPJ inválido',
      });
      return;
    }

    const { firestore, onClose } = this.props;
    const doc = firestore.doc(`${fullPath}/${cnpj}`);
    doc.get().then((snapShot) => {
      if (snapShot.exists) {
        this.setState({
          errorMessage: 'CNPJ já existente',
        });
        return;
      }

      firestore
        .doc(`${fullPath}/${cnpj}`)
        .set({
          cnpj: cnpj,
          name: name,
        })
        .then(() => {
          onClose('Convênio criado com sucesso.');
        })
        .catch((error) => {
          this.setState({
            errorMessage: error,
          });
        });
    });
  };

  render() {
    const { errorMessage } = this.state;
    const { onClose } = this.props;
    return (
      <FirestorePath
        path="HealthPlans"
        render={(fullPath) => (
          <Item
            title="Novo Convênio"
            isNew
            errorMessage={errorMessage}
            onSubmit={(...props) => this.handleSubmit(fullPath, ...props)}
            onClose={onClose}
          />
        )}
      />
    );
  }
}

export default withFirestore(NewItem);
