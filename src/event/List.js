import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { withFirestore } from 'react-firestore';
import NewItem from '../calendar/NewItem';
import List from '../components/List';
import UserContext from '../context/UserContext';
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

function EventList({ firestore }) {
  const [{ healthPlanHash, healthPlans }, setState] = useState({});
  const { uid } = useContext(UserContext);

  useEffect(() => {
    const path = `/Users/${uid}/HealthPlans`;

    firestore.collection(path).onSnapshot((snapshot) => {
      const healthPlanHash = generateHash(snapshot);
      setState({ healthPlanHash, healthPlans: snapshot });
    });
  }, [firestore, uid]);

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

export default withFirestore(EventList);
