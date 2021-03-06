import React, { FunctionComponent } from 'react';
import { Button, Loader, Table } from 'semantic-ui-react';

const EmptyRow: FunctionComponent = ({ children }) => (
  <Table.Row>
    <Table.Cell colSpan="1000">{children}</Table.Cell>
  </Table.Row>
);

const LoadingRow = () => (
  <Table.Row>
    <Table.Cell colSpan="1000">
      <Loader inline="centered" active />
    </Table.Cell>
  </Table.Row>
);

const ActionsCell: FunctionComponent<ActionsCellProps> = ({ notEditable, onEdit, onRemove }) => (
  <Table.Cell collapsing>
    <Button.Group>
      {notEditable ? null : (
        <Button
          compact
          icon="edit"
          size="mini"
          basic
          title="Editar"
          onClick={(event) => {
            event.preventDefault();
            onEdit();
          }}
        />
      )}
      <Button
        compact
        icon="remove"
        size="mini"
        basic
        title="Remover"
        onClick={(event) => {
          event.preventDefault();
          onRemove();
        }}
      />
    </Button.Group>
  </Table.Cell>
);

export { LoadingRow, EmptyRow, ActionsCell };

interface ActionsCellProps {
  notEditable?: boolean;
  onEdit: () => void;
  onRemove: () => void;
}
