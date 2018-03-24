import React from "react";

import { Button, Table, Loader } from "semantic-ui-react";


const EmptyRow = props => {
  return (
    <Table.Row>
      <Table.Cell colSpan="1000">
        {props.children}
      </Table.Cell>
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

const ActionsCell = props =>
  <Table.Cell collapsing>
    <Button.Group>
      <Button
        compact
        icon="clone"
        size="mini"
        basic
        title="Clonar"
        onClick={event => {
          event.preventDefault();
          props.onClone();
        }}
      />
      <Button
        compact
        icon="remove"
        size="mini"
        basic
        title="Remover"
        onClick={event => {
          event.preventDefault();
          props.onRemove();
        }}
      />
    </Button.Group>
  </Table.Cell>;

export { LoadingRow, EmptyRow, ActionsCell };
