import React, { Component } from 'react';
import { withFirestore } from 'react-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import CPF from 'cpf';
import EditItem from './EditItem';
import NewItem from './NewItem';
import List from '../shared/List';
import { generateHash } from '../utils/health-plan-utils';

const cells = healthPlanHash => [
  { format: item => (item.cpf ? CPF.format(item.cpf) : null), width: 3 },
  { format: item => item.name },
  {
    format: item => (healthPlanHash && item.healthPlanId ? healthPlanHash[item.healthPlanId] : 'Particular'),
  },
];

const columns = ['CPF', 'Nome', 'Convênio'];

const newItem = healthPlans => props => <NewItem healthPlans={healthPlans} {...props} />;
const editItem = healthPlans => props => <EditItem healthPlans={healthPlans} {...props} />;

class CustomerList extends Component {
  state = {};

  componentDidMount() {
    const { firestore } = this.props;
    const user = firebase.auth().currentUser;
    const path = `/Users/${user.uid}/HealthPlans`;

    firestore.collection(path).onSnapshot(snapshot => {
      const healthPlanHash = generateHash(snapshot);
      this.setState({ healthPlanHash, healthPlans: snapshot });
    });
  }

  render() {
    const { healthPlanHash, healthPlans } = this.state;
    return (
      <List
        cells={cells(healthPlanHash)}
        columns={columns}
        createButtonText="Novo Paciente"
        editItem={editItem(healthPlans)}
        newItem={newItem(healthPlans)}
        title="Paciente"
        emptyMessage="Nenhum paciente encontrado"
        path="Customers"
      />
    );
  }
}

export default withFirestore(CustomerList);
