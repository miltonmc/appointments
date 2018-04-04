import React, { Component } from "react";
import { Button, Header, Segment, Table } from "semantic-ui-react";
import { FirestoreCollection } from "react-firestore";
import { LoadingRow, EmptyRow, ActionsCell } from "shared/TableHelper";
import NewItem from "./NewItem";
import CNPJ from "cnpj";
import FirestorePath from "shared/FirestorePath";
import ConfirmRemove from "shared/ConfirmRemove";

export default class List extends Component {
  state = { isNewItemVisible: false, isConfirmRemoveVisible: false };
  handleNewItem = (visibility, message) => {
    this.setState({
      isNewItemVisible: visibility
    });
  };

  handleRemove = (itemPath, itemDescription) => {
    this.setState({
      isConfirmRemoveVisible: true,
      itemPath: itemPath,
      itemDescription: itemDescription
    });
  };

  handleRemoveCofirmClose = message => {
    this.setState({
      isConfirmRemoveVisible: false,
      itemPath: "",
      itemDescription: ""
    });
  };

  render() {
    const {
      isNewItemVisible,
      isConfirmRemoveVisible,
      itemPath,
      itemDescription
    } = this.state;
    return (
      <Segment>
        <Header as="h1">Convênios</Header>
        <Table striped>
          <TableHeaders />
          <TableBody onRemove={this.handleRemove} />
        </Table>
        <Button onClick={() => this.handleNewItem(true)} primary>
          Novo Convênio
        </Button>
        {isNewItemVisible ? (
          <NewItem onClose={message => this.handleNewItem(false, message)} />
        ) : null}
        {isConfirmRemoveVisible ? (
          <ConfirmRemove
            path={itemPath}
            description={itemDescription}
            onClose={this.handleRemoveCofirmClose}
          />
        ) : null}
      </Segment>
    );
  }
}

const TableHeaders = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>CNPJ</Table.HeaderCell>
      <Table.HeaderCell>Nome</Table.HeaderCell>
      <Table.HeaderCell />
    </Table.Row>
  </Table.Header>
);

const TableBody = ({ onRemove }) => (
  <Table.Body>
    <FirestorePath
      path="HealthPlan"
      render={fullPath => (
        <FirestoreCollection
          path={fullPath}
          render={({ isLoading, data }) => {
            return isLoading ? (
              <LoadingRow />
            ) : data.length === 0 ? (
              <EmptyRow>Nenhum convênio encontrado</EmptyRow>
            ) : (
              data.map(item => (
                <Table.Row key={item.id}>
                  <Table.Cell width={3}>{CNPJ.format(item.cnpj)}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <ActionsCell
                    notEditable={true}
                    onRemove={() =>
                      onRemove(`${fullPath}/${item.id}`, item.name)
                    }
                  />
                </Table.Row>
              ))
            );
          }}
        />
      )}
    />
  </Table.Body>
);
