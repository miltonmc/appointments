import React, { useContext, useState } from 'react';
import { withFirestore } from 'react-firestore';
import FirebaseContext from '../context/FirebaseContext';
import Item from './Item';

const CalendarEventNew = ({ firestore, onClose, healthPlanHash, ...event }) => {
  const [errorMessage, setErrorMessage] = useState();
  const { firestorePath } = useContext(FirebaseContext);
  const eventPath = `${firestorePath}/Events`;

  const handleSubmit = async ({ id, ...event }) => {
    if (!event.customer?.id) {
      setErrorMessage('O campo cliente deve ser preenchido!');
      return;
    }

    try {
      id ? await firestore.doc(`${eventPath}/${id}`).set(event) : await firestore.collection(eventPath).add(event);
      onClose('Evento salvo com sucesso.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Item
      title="Novo Evento"
      isNew
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
      onClose={onClose}
      healthPlanHash={healthPlanHash}
      {...event}
    />
  );
};

export default withFirestore(CalendarEventNew);
