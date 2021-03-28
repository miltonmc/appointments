import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import FirestorePath from '../components/FirestorePath';
import Item from './Item.js';

const HealthPlanEdit = ({ item, firestore, onClose }) => {
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async (fullPath, id, _cnpj, name) => {
    try {
      await firestore.doc(`${fullPath}/${id}`).update({ name });
      onClose('Convênio atualizado com sucesso.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <FirestorePath
      path="HealthPlans"
      render={(fullPath) => (
        <Item
          title="Convênio"
          {...item}
          errorMessage={errorMessage}
          onSubmit={(...props) => handleSubmit(fullPath, ...props)}
          onClose={onClose}
        />
      )}
    />
  );
};

export default withFirestore(HealthPlanEdit);
