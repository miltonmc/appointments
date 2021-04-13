import React, { useContext, useState } from 'react';
import FirebaseContext from '../context/FirebaseContext';
import Customer from './Item';

const CustomerEdit = ({ firestore, item, onClose }) => {
  const [errorMessage, setErrorMessage] = useState();
  const { firestorePath } = useContext(FirebaseContext);

  const handleSubmit = async (id, custumer, errorMessage) => {
    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    try {
      await firestore.doc(`${firestorePath}/Customers/${id}`).update(custumer);
      onClose('Convênio atualizado com sucesso.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return <Customer title="Paciente" errorMessage={errorMessage} onSubmit={handleSubmit} onClose={onClose} {...item} />;
};

export default CustomerEdit;
