import React, { useContext, useState } from 'react';
import { FirestoreCollection } from 'react-firestore';
import { Button, Header, Segment, Table, TableBodyProps as SemanticTableBodyProps } from 'semantic-ui-react';
import FirebaseContext from '../context/FirebaseContext';
import ConfirmRemove from './ConfirmRemove';
import { ActionsCell, EmptyRow, LoadingRow } from './TableHelper';

export default function List({
  cells,
  columns,
  createButtonText,
  editItem,
  emptyMessage,
  newItem,
  sort,
  title,
  path,
}: ListProps) {
  const [isAdding, setAdding] = useState<boolean>(false);
  const [{ isRemoving, itemPath, itemDescription }, setRemoving] = useState<{
    isRemoving: boolean;
    itemPath: string;
    itemDescription?: string;
  }>({
    isRemoving: false,
    itemPath: '',
    itemDescription: '',
  });
  const [{ isEditing, item }, setEditing] = useState<{ isEditing: boolean; item: DataItem | null }>({
    isEditing: false,
    item: null,
  });

  function handleNewItem(visibility: boolean, _message?: string) {
    setAdding(visibility);
  }

  function handleEditItem(isEditing: boolean, item: DataItem | null) {
    setEditing({ isEditing, item });
  }

  function handleRemove(itemPath: string, itemDescription?: string) {
    setRemoving({
      isRemoving: true,
      itemPath,
      itemDescription,
    });
  }

  function handleRemoveConfirmClose(message: string) {
    setRemoving({
      isRemoving: false,
      itemPath: '',
      itemDescription: '',
    });
  }

  let modal;
  if (isAdding) {
    modal = newItem?.({ onClose: (message: string) => handleNewItem(false, message) });
  } else if (isEditing) {
    modal = editItem?.({ item, onClose: () => handleEditItem(false, null) });
  } else if (isRemoving) {
    modal = <ConfirmRemove path={itemPath} description={itemDescription} onClose={handleRemoveConfirmClose} />;
  }

  return (
    <Segment>
      <Header as="h1" className="list-header">
        {title || 'Items'}
        <Button onClick={() => handleNewItem(true)} primary>
          {createButtonText || 'Novo Item'}
        </Button>
      </Header>
      <Table striped>
        <TableHeaders columns={columns} />
        <TableBody
          cells={cells.length === columns.length ? cells : cells.slice(0, columns.length)}
          emptyMessage={emptyMessage}
          path={path}
          onEdit={handleEditItem}
          onRemove={handleRemove}
          sort={sort}
          nameComposer={cells[cells.length - 1].format}
        />
      </Table>
      {modal}
    </Segment>
  );
}

const TableHeaders: React.FC<TableHeadersProps> = ({ columns }) => (
  <Table.Header>
    <Table.Row>
      {columns.map((column, idx) => (
        <Table.HeaderCell key={idx}>{column}</Table.HeaderCell>
      ))}
      <Table.HeaderCell />
    </Table.Row>
  </Table.Header>
);

const TableBody: React.FC<TableBodyProps> = ({ emptyMessage, path, cells, onRemove, onEdit, sort, nameComposer }) => {
  const { firestorePath } = useContext(FirebaseContext);
  const fullPath = `${firestorePath}/${path}`;

  return (
    <Table.Body>
      <FirestoreCollection
        sort={sort}
        path={fullPath}
        render={({ isLoading, data }: FirestoreRender) => {
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
    </Table.Body>
  );
};

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
