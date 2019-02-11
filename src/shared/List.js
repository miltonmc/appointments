import React, { Component } from 'react';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { FirestoreCollection } from 'react-firestore';
import { LoadingRow, EmptyRow, ActionsCell } from './TableHelper';
import FirestorePath from './FirestorePath';
import ConfirmRemove from './ConfirmRemove';
import './List.css';

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
      itemPath: '',
      itemDescription: ''
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
    const {
      cells,
      columns,
      createButtonText,
      editItem,
      emptyMessage,
      newItem,
      sort,
      title,
      path,
    } = this.props

    let modal;
    if (isAdding) {
      modal = newItem && newItem({ onClose: message => this.handleNewItem(false, message) });
    } else if (isEditing) {
      modal = editItem && editItem({ item, onClose: () => this.handleEditItem(false, null)});
    } else if (isRemoving) {
      modal = <ConfirmRemove path={itemPath} description={itemDescription} onClose={this.handleRemoveCofirmClose} />
    }

    return (
      <Segment>
        <Header as="h1" className="list-header">
          {title || 'Items'}
          <Button onClick={() => this.handleNewItem(true)} primary>
            {createButtonText || 'Novo Item'}
          </Button>
        </Header>
        <Table striped>
          <TableHeaders columns={columns}/>
          <TableBody
            cells={cells.length === columns.length ? cells : cells.slice(0, columns.length)}
            emptyMessage={emptyMessage}
            path={path}
            onEdit={this.handleEditItem}
            onRemove={this.handleRemove}
            sort={sort}
            composedName={cells[cells.length - 1].format}
          />
        </Table>
        {modal}
      </Segment>
    );
  }
}

const TableHeaders = ({columns}) => (
  <Table.Header>
    <Table.Row>
      {columns.map((column, idx) => <Table.HeaderCell key={idx}>{column}</Table.HeaderCell>)}
      <Table.HeaderCell />
    </Table.Row>
  </Table.Header>
);

const displayItem = (cell, item) => {
  return cell.format ? cell.format(item) : item[cell.path];
};

const TableBody = ({ emptyMessage, path, cells, onRemove, onEdit, sort, composedName }) => (
  <Table.Body>
    <FirestorePath
      path={path}
      render={fullPath => (
        <FirestoreCollection
          sort={sort}
          path={fullPath}
          render={({ isLoading, data }) => {
            return isLoading ? (
              <LoadingRow />
            ) : data.length === 0 ? (
              <EmptyRow>{emptyMessage || 'Nenhum item encontrado'}</EmptyRow>
            ) : (
              data.map(item => (
                <Table.Row key={item.id}>
                  {cells.map((cell, idx) => <Table.Cell key={idx} {...cell}>{displayItem(cell, item)}</Table.Cell>)}
                  <ActionsCell
                    onEdit={() => onEdit(true, item)}
                    onRemove={() => onRemove(`${fullPath}/${item.id}`, item.name || composedName(item))}
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
