import React from "react";
import { withFirestore } from "react-firestore";
import { Confirm } from 'semantic-ui-react';

const handleConfirm = (firestore, path, onClose) => {
  firestore.doc(path).delete().then(() => {
    onClose("Item removido com sucesso");
  }).catch((error) => {
    onClose(`Falha ao remover item: ${error}`);
  })
};

const ConfirmRemove = ({ firestore, path, description, onClose }) => (
  <Confirm
    open={true}
    content={`Tem certeza que deseja remover: ${description}?`}
    onCancel={onClose}
    onConfirm={() => handleConfirm(firestore, path, onClose)}
  />
);
export default withFirestore(ConfirmRemove);
