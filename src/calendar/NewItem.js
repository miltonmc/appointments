import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import FirestorePath from '../components/FirestorePath';
import Item from './Item';

function CalendarNewItem(props) {
  const [errorMessage, setErrorMessage] = useState();
  const { firestore, onClose } = props;

  async function handleSubmit(fullPath, { id, ...event }) {
    if (!event?.customer?.id) {
      setErrorMessage('O campo cliente deve ser preenchido!');
      return;
    }

    try {
      id ? await firestore.doc(`${fullPath}/${id}`).set(event) : await firestore.collection(`${fullPath}`).add(event);
      onClose('Evento salvo com sucesso.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <FirestorePath
      path="Events"
      render={(fullPath) => (
        <Item
          title="Novo Evento"
          isNew
          errorMessage={errorMessage}
          onSubmit={(event) => handleSubmit(fullPath, event)}
          {...props}
        />
      )}
    />
  );
}

export default withFirestore(CalendarNewItem);
