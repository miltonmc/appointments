import React, { Component } from 'react';
import { withFirestore } from 'react-firestore';
import Item from './Item';
import FirestorePath from 'shared/FirestorePath';

class NewItem extends Component {
  state = {};
  handleSubmit = (fullPath, id, customer, errorMessage) => {
    if (errorMessage) {
      this.setState({ errorMessage});
      return;
    }

    const { firestore, onClose } = this.props;
    firestore.collection(`${fullPath}`).add(customer)
      .then(() => onClose('Convênio criado com sucesso.'))
      .catch(error => this.setState({ errorMessage: error }));
  };

  render() {
    const { errorMessage } = this.state;
    const { healthPlans, onClose } = this.props;
    return (
      <FirestorePath
        path="Customers"
        render={fullPath => (
          <Item
            title="Novo Paciente"
            healthPlans={healthPlans}
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
