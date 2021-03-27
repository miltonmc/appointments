import { validate } from 'cnpj';
import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import FirestorePath from '../components/FirestorePath';
import Item from './Item.js';

const HealthPlanNew = ({ firestore, onClose }) => {
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async (fullPath, _id, cnpj, name) => {
    if (!validate(cnpj)) {
      setErrorMessage('CNPJ inválido');
      return;
    }

    const doc = firestore.doc(`${fullPath}/${cnpj}`);
    const snapShot = await doc.get();
    if (snapShot.exists) {
      setErrorMessage('CNPJ já existente');
      return;
    }

    try {
      await firestore.doc(`${fullPath}/${cnpj}`).set({
        cnpj: cnpj,
        name: name,
      });
      onClose('Convênio criado com sucesso.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <FirestorePath
      path="HealthPlans"
      render={(fullPath) => (
        <Item
          title="Novo Convênio"
          isNew
          errorMessage={errorMessage}
          onSubmit={(...args) => handleSubmit(fullPath, ...args)}
          onClose={onClose}
        />
      )}
    />
  );
};

export default withFirestore(HealthPlanNew);
