import React from "react";
import { Button, Header, Segment, Table } from "semantic-ui-react";
import { FirestoreCollection } from "react-firestore";
import { LoadingRow, EmptyRow } from "shared/TableHelper";

export default () => (
  <Segment>
    <Header as="h1">Convênios</Header>
    <Table striped>
      <TableHeaders />
      <TableBody />
    </Table>
    <Button primary>Novo Convênio</Button>
  </Segment>
);

const TableHeaders = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Email</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

const TableBody = () => (
  <Table.Body>
    <FirestoreCollection
      path="allowed_google_users"
      render={({ isLoading, data }) => {
        return isLoading ? (
          <LoadingRow />
        ) : data.length === 0 ? (
          <EmptyRow>Nenhum convênio encontrado</EmptyRow>
        ) : data.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>
                {user.email}
              </Table.Cell>
            </Table.Row>
          )
        )
      }}
    />
  </Table.Body>
);
