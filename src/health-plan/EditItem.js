import React, { useContext, useState } from 'react';
import { withFirestore } from 'react-firestore';
import FirebaseContext from '../context/FirebaseContext';
import Item from './Item';

const HealthPlanEdit = ({ item, firestore, onClose }) => {
  const [errorMessage, setErrorMessage] = useState();
  const { firestorePath } = useContext(FirebaseContext);

  const handleSubmit = async (id, _cnpj, name) => {
    try {
      await firestore.doc(`${firestorePath}/HealthPlans/${id}`).update({ name });
      onClose('Convênio atualizado com sucesso.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return <Item title="Convênio" {...item} errorMessage={errorMessage} onSubmit={handleSubmit} onClose={onClose} />;
};

export default withFirestore(HealthPlanEdit);
