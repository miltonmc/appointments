import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import FirestorePath from '../components/FirestorePath';
import Customer from './Item.js';

const CustomerItemEditable = ({ firestore, item, onClose }) => {
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async (fullPath, id, custumer, errorMessage) => {
    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    try {
      await firestore.doc(`${fullPath}/${id}`).update(custumer);
      onClose('Convênio atualizado com sucesso.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <FirestorePath
      path="Customers"
      render={(fullPath) => (
        <Customer
          title="Paciente"
          {...item}
          errorMessage={errorMessage}
          onSubmit={(...args) => handleSubmit(fullPath, ...args)}
          onClose={onClose}
        />
      )}
    />
  );
};

export default withFirestore(CustomerItemEditable);
