import { validate } from 'cnpj';
import React, { useContext, useState } from 'react';
import { withFirestore } from 'react-firestore';
import FirebaseContext from '../context/FirebaseContext';
import Item from './Item';

const HealthPlanNew = ({ firestore, onClose }) => {
  const [errorMessage, setErrorMessage] = useState();
  const { firestorePath } = useContext(FirebaseContext);
  const fullPath = `${firestorePath}/HealthPlans`;

  const handleSubmit = async (_id, cnpj, name) => {
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

  return <Item title="Novo Convênio" isNew errorMessage={errorMessage} onSubmit={handleSubmit} onClose={onClose} />;
};

export default withFirestore(HealthPlanNew);
