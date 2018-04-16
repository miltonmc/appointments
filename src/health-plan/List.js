import React, { Component } from "react";
import { Button, Header, Segment, Table } from "semantic-ui-react";
import { FirestoreCollection } from "react-firestore";
import { LoadingRow, EmptyRow, ActionsCell } from "shared/TableHelper";
import EditItem from "./EditItem";
import NewItem from "./NewItem";
import CNPJ from "cnpj";
import FirestorePath from "shared/FirestorePath";
import ConfirmRemove from "shared/ConfirmRemove";

export default class List extends Component {
  state = { isAdding: false, isRemoving: false, isEditing: false };
  handleNewItem = (visibility, message) => {
    this.setState({
      isAdding: visibility
    });
  };

  handleEditItem = (isEditing, item) => {
    this.setState({ isEditing, item });
  };

  handleRemove = (itemPath, itemDescription) => {
    this.setState({
      isRemoving: true,
      itemPath: itemPath,
      itemDescription: itemDescription
    });
  };

  handleRemoveCofirmClose = message => {
    this.setState({
      isRemoving: false,
      itemPath: "",
      itemDescription: ""
    });
  };

  render() {
    const {
      isEditing,
      isAdding,
      isRemoving,
      item,
      itemPath,
      itemDescription
    } = this.state;

    let modal;
    if (isAdding) {
      modal = <NewItem onClose={message => this.handleNewItem(false, message)} />;
    } else if (isEditing) {
      modal = <EditItem item={item} onClose={() => this.handleEditItem(false, null)} />;
    } else if (isRemoving) {
      modal = <ConfirmRemove path={itemPath} description={itemDescription} onClose={this.handleRemoveCofirmClose} />
    }

    return (
      <Segment>
        <Header as="h1">Convênios</Header>
        <Table striped>
          <TableHeaders />
          <TableBody onEdit={this.handleEditItem} onRemove={this.handleRemove} />
        </Table>
        <Button onClick={() => this.handleNewItem(true)} primary>
          Novo Convênio
        </Button>
        {modal}
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

const TableBody = ({ onRemove, onEdit }) => (
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
                    onEdit={() => onEdit(true, item)}
                    onRemove={() => onRemove(`${fullPath}/${item.id}`, item.name)}
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
