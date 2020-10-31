import React, { Component, FunctionComponent } from 'react';
import { FirestoreCollection } from 'react-firestore';
import { Button, Header, Segment, Table, TableBodyProps as SemanticTableBodyProps } from 'semantic-ui-react';
import ConfirmRemove from './ConfirmRemove';
import FirestorePath from './FirestorePath';
import { ActionsCell, EmptyRow, LoadingRow } from './TableHelper';

export default class List extends Component<ListProps> {
  state: ListState = { isAdding: false, isRemoving: false, isEditing: false };
  handleNewItem = (visibility: boolean, message?: string) => {
    this.setState({
      isAdding: visibility,
    });
  };

  handleEditItem = (isEditing: boolean, item: DataItem | null) => {
    this.setState({ isEditing, item });
  };

  handleRemove = (itemPath: string, itemDescription?: string) => {
    this.setState({
      isRemoving: true,
      itemPath,
      itemDescription,
    });
  };

  handleRemoveConfirmClose = (message: string) => {
    this.setState({
      isRemoving: false,
      itemPath: '',
      itemDescription: '',
    });
  };

  render() {
    const { isEditing, isAdding, isRemoving, item, itemPath, itemDescription } = this.state;
    const { cells, columns, createButtonText, editItem, emptyMessage, newItem, sort, title, path } = this.props;

    let modal;
    if (isAdding) {
      modal = newItem?.({ onClose: (message: string) => this.handleNewItem(false, message) });
    } else if (isEditing) {
      modal = editItem?.({ item, onClose: () => this.handleEditItem(false, null) });
    } else if (isRemoving) {
      modal = <ConfirmRemove path={itemPath} description={itemDescription} onClose={this.handleRemoveConfirmClose} />;
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
          <TableHeaders columns={columns} />
          <TableBody
            cells={cells.length === columns.length ? cells : cells.slice(0, columns.length)}
            emptyMessage={emptyMessage}
            path={path}
            onEdit={this.handleEditItem}
            onRemove={this.handleRemove}
            sort={sort}
            nameComposer={cells[cells.length - 1].format}
          />
        </Table>
        {modal}
      </Segment>
    );
  }
}

const TableHeaders: FunctionComponent<TableHeadersProps> = ({ columns }) => (
  <Table.Header>
    <Table.Row>
      {columns.map((column, idx) => (
        <Table.HeaderCell key={idx}>{column}</Table.HeaderCell>
      ))}
      <Table.HeaderCell />
    </Table.Row>
  </Table.Header>
);

const TableBody: FunctionComponent<TableBodyProps> = ({
  emptyMessage,
  path,
  cells,
  onRemove,
  onEdit,
  sort,
  nameComposer,
}) => (
  <Table.Body>
    <FirestorePath
      path={path}
      render={(fullPath) => (
        <FirestoreCollection
          sort={sort}
          path={fullPath}
          render={({ isLoading, data }: FirestorePathRenderProps) => {
            return isLoading ? (
              <LoadingRow />
            ) : data.length === 0 ? (
              <EmptyRow>{emptyMessage ?? 'Nenhum item encontrado'}</EmptyRow>
            ) : (
              data.map((item) => (
                <Table.Row key={item.id}>
                  {cells.map(({ format, ...cell }, idx) => (
                    <Table.Cell key={idx} {...cell}>
                      {format?.(item) ?? item[cell.path]}
                    </Table.Cell>
                  ))}
                  <ActionsCell
                    onEdit={() => onEdit(true, item)}
                    onRemove={() => onRemove(`${fullPath}/${item.id}`, item.name || nameComposer?.(item))}
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

interface Cell {
  format?: (item: DataItem) => string;
  path: string;
}

interface ListProps extends TableHeadersProps {
  cells: Cell[];
  createButtonText: string;
  editItem: any;
  emptyMessage?: string;
  newItem: any;
  path: string;
  sort: string;
  title: string;
}

interface ListState {
  isAdding: boolean;
  isEditing: boolean;
  isRemoving: boolean;
  item?: string;
  itemDescription?: string;
  itemPath?: string;
}

interface TableBodyProps extends SemanticTableBodyProps {
  cells: Cell[];
  emptyMessage?: string;
  path: string;
  sort: string;
  nameComposer?: (item: DataItem) => string;
  onRemove: (path: string, description?: string) => void;
  onEdit: (isEditing: boolean, item: DataItem) => void;
}

interface TableHeadersProps {
  columns: string[];
}
