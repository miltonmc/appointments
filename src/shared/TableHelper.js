import React from 'react';

import { Button, Table, Loader } from 'semantic-ui-react';

const EmptyRow = (props) => {
  return (
    <Table.Row>
      <Table.Cell colSpan="1000">{props.children}</Table.Cell>
    </Table.Row>
  );
};

const LoadingRow = () => {
  return (
    <Table.Row>
      <Table.Cell colSpan="1000">
        <Loader inline="centered" active />
      </Table.Cell>
    </Table.Row>
  );
};

const ActionsCell = (props) => (
  <Table.Cell collapsing>
    <Button.Group>
      {props.notEditable ? null : (
        <Button
          compact
          icon="edit"
          size="mini"
          basic
          title="Editar"
          onClick={(event) => {
            event.preventDefault();
            props.onEdit();
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
          props.onRemove();
        }}
      />
    </Button.Group>
  </Table.Cell>
);

export { LoadingRow, EmptyRow, ActionsCell };
