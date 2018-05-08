import React, { Component } from "react";
import { Button, Header, Segment, Table } from "semantic-ui-react";
import { FirestoreCollection, withFirestore } from "react-firestore";
import { LoadingRow, EmptyRow, ActionsCell } from "shared/TableHelper";
import EditItem from "./EditItem";
import NewItem from "./NewItem";
import CPF from "cpf";
import FirestorePath from "shared/FirestorePath";
import ConfirmRemove from "shared/ConfirmRemove";
import firebase from 'firebase';

class List extends Component {
  state = { isNewItemVisible: false, isConfirmRemoveVisible: false, isEditing: false };

  handleNewItem = (isNewItemVisible, message) => this.setState({ isNewItemVisible });

  handleEditItem = (isEditing, item) => this.setState({ isEditing, item });

  handleRemove = (itemPath, itemDescription) => this.setState({
    isConfirmRemoveVisible: true,
    itemPath,
    itemDescription,
  });

  handleRemoveCofirmClose = message => this.setState({
    isConfirmRemoveVisible: false,
    itemPath: '',
    itemDescription: '',
  });

  componentDidMount() {
    const { firestore } = this.props;
    const user = firebase.auth().currentUser;
    const path = `/Users/${user.uid}/HealthPlans`;

    firestore.collection(path).onSnapshot(snapshot => {
      this.setState({ healthPlans: snapshot && snapshot.docs });
    });
  }

  render() {
    const {
      isEditing,
      isNewItemVisible,
      isConfirmRemoveVisible,
      item,
      itemPath,
      itemDescription,
      healthPlans,
    } = this.state;

    let modal;
    if (isNewItemVisible) {
      modal = <NewItem onClose={message => this.handleNewItem(false, message)} />;
    } else if (isEditing) {
      modal = <EditItem item={item} onClose={() => this.handleEditItem(false, null)} />;
    } else if (isConfirmRemoveVisible) {
      modal = <ConfirmRemove path={itemPath} description={itemDescription} onClose={this.handleRemoveCofirmClose} />
    }

    return (
      <Segment>
        <Header as="h1">Paciente</Header>
        <Table striped>
          <TableHeaders />
          <TableBody onEdit={this.handleEditItem} onRemove={this.handleRemove} healthPlans={healthPlans}/>
        </Table>
        <Button onClick={() => this.handleNewItem(true)} primary>
          Novo Paciente
        </Button>
        {modal}
      </Segment>
    );
  }
}

const TableHeaders = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>CPF</Table.HeaderCell>
      <Table.HeaderCell>Nome</Table.HeaderCell>
      <Table.HeaderCell>Convênio</Table.HeaderCell>
      <Table.HeaderCell />
    </Table.Row>
  </Table.Header>
);

const getPlanName = (healthPlans, id) =>{
  const healthPlan = healthPlans && healthPlans.find(plan => plan.id === id);
  return healthPlan && healthPlan.data().name
};

const TableBody = ({ onRemove, onEdit, healthPlans }) => (
  <Table.Body>
    <FirestorePath
      path="Customers"
      render={fullPath => (
        <FirestoreCollection
          path={fullPath}
          render={({ isLoading, data }) => {
            return isLoading ? (
              <LoadingRow />
            ) : data.length === 0 ? (
              <EmptyRow>Nenhum paciente encontrado</EmptyRow>
            ) : (
              data.map(item => (
                <Table.Row key={item.id}>
                  <Table.Cell width={3}>{item.cpf ? CPF.format(item.cpf) : null}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.healthPlanId ? getPlanName(healthPlans, item.healthPlanId) : 'Particular'}</Table.Cell>
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

export default withFirestore(List);
