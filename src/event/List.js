import React, { Component } from 'react';
import { withFirestore } from 'react-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import moment from 'moment';
import NewItem from '../calendar/NewItem';
import List from '../shared/List';
import { generateHash } from '../utils/health-plan-utils';

const healthPlanName = (item, healthPlanHash) =>
  healthPlanHash && item.healthPlanId ? healthPlanHash[item.healthPlanId] : 'Particular';

const cells = (healthPlanHash) => [
  { format: (item) => moment(item.start.toDate()).format('DD/MM/YYYY HH:mm') },
  { format: (item) => item.customer.name },
  { format: (item) => healthPlanName(item, healthPlanHash) },
  {
    format: (item) => `[${healthPlanName(item, healthPlanHash)}] ${item.customer.name}`,
  },
];

const columns = ['Horário', 'Paciente', 'Convênio'];

const newItem = (healthPlans) => (props) => <NewItem healthPlans={healthPlans} {...props} />;
const editItem = (healthPlans) => (props) => {
  const { item, ...rest } = props;
  const title = item.customer.name + ' - ' + item.healthPlan;
  const newProps = { title, ...item, ...rest };
  return <NewItem healthPlans={healthPlans} {...newProps} />;
};

class EventList extends Component {
  state = {};

  componentDidMount() {
    const { firestore } = this.props;
    const user = firebase.auth().currentUser;
    const path = `/Users/${user.uid}/HealthPlans`;

    firestore.collection(path).onSnapshot((snapshot) => {
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
        createButtonText="Nova consulta"
        editItem={editItem(healthPlans)}
        newItem={newItem(healthPlans)}
        title="Consultas"
        emptyMessage="Nenhuma consulta encontrada"
        path="Events"
        sort="start:desc"
      />
    );
  }
}

export default withFirestore(EventList);
