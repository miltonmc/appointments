import React, { useContext, useState } from 'react';
import { withFirestore } from 'react-firestore';
import FirebaseContext from '../context/FirebaseContext';
import Customer from './Item';

const CustomerNew = ({ firestore, healthPlans, onClose }) => {
  const [errorMessage, setErrorMessage] = useState();
  const { firestorePath } = useContext(FirebaseContext);

  const handleSubmit = async (id, customer, errorMessage) => {
    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    try {
      await firestore.collection(`${firestorePath}/Customers`).add(customer);
      onClose('Convênio criado com sucesso.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Customer
      title="Novo Paciente"
      healthPlans={healthPlans}
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default withFirestore(CustomerNew);
