import React, { FunctionComponent } from 'react';
import { withFirestore } from 'react-firestore';
import { Confirm } from 'semantic-ui-react';

interface Props extends WithFirestoreProps {
  path: string;
  description: string;
  onClose: (message?: string) => void;
}

const ConfirmRemove: FunctionComponent<Props> = ({ firestore, path, description, onClose }) => {
  const handleConfirm = () => {
    firestore
      .doc(path)
      .delete()
      .then(() => onClose('Item removido com sucesso'))
      .catch((error: Error) => onClose(`Falha ao remover item: ${error.message}`));
  };

  return (
    <Confirm
      open={true}
      content={`Tem certeza que deseja remover: ${description}?`}
      onCancel={() => onClose()}
      onConfirm={handleConfirm}
    />
  );
};
export default withFirestore(ConfirmRemove);
