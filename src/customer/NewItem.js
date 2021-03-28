import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import FirestorePath from '../components/FirestorePath';
import Customer from './Item';

const CustomerNew = ({ firestore, healthPlans, onClose }) => {
  const [errorMessage, setErrorMessage] = useState();
  const handleSubmit = async (fullPath, id, customer, errorMessage) => {
    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    try {
      await firestore.collection(fullPath).add(customer);
      onClose('Convênio criado com sucesso.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <FirestorePath
      path="Customers"
      render={(fullPath) => (
        <Customer
          title="Novo Paciente"
          healthPlans={healthPlans}
          errorMessage={errorMessage}
          onSubmit={(...args) => handleSubmit(fullPath, ...args)}
          onClose={onClose}
        />
      )}
    />
  );
};

export default withFirestore(CustomerNew);
