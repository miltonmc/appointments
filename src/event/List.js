import React, { Component } from 'react';
import { withFirestore } from 'react-firestore';
import Firebase from 'firebase';
import moment from 'moment';
import NewItem from '../calendar/NewItem';
import List from '../shared/List';

const cells = (healthPlanHash) => [
  { format: (item) => moment(item.start.toDate()).format('DD/MM/YYYY HH:mm')},
  { format: (item) => item.customer.name },
  { format: (item) => healthPlanHash && item.healthPlanId ? healthPlanHash[item.healthPlanId] : 'Particular' },
];

const columns = ['Horário', 'Paciente', 'Convênio'];

const newItem = (healthPlans) => (props) => <NewItem healthPlans={healthPlans} {...props} />;
const editItem = (healthPlans) => (props) => {
  const {item, ...rest} = props;
  const title = item.customer.name + ' - ' + item.healthPlan;
  const newProps = {title, ...item, ...rest};
  return <NewItem healthPlans={healthPlans} {...newProps} />;
};

class EventList extends Component {
  state = {};

  componentDidMount() {
    const { firestore } = this.props;
    const user = Firebase.auth().currentUser;
    const path = `/Users/${user.uid}/HealthPlans`;

    firestore.collection(path).onSnapshot(snapshot => {
      const healthPlanHash = {};
      snapshot && snapshot.docs.forEach(healthPlan => {
        const name = healthPlan.data().name;
        healthPlanHash[healthPlan.id] = name
      });
      this.setState({ healthPlanHash, healthPlans: snapshot });
    });
  }

  render() {
    const {healthPlanHash, healthPlans} = this.state;
    return <List
      cells={cells(healthPlanHash)}
      columns={columns}
      createButtonText="Nova consulta"
      editItem={editItem(healthPlans)}
      newItem={newItem(healthPlans)}
      title="Consultas"
      emptyMessage="Nenhuma consulta encontrada"
      path="Events"
      sort="start:desc"
    />;
  }
}

export default withFirestore(EventList);