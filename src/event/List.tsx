import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { withFirestore } from 'react-firestore';
import NewItem from '../calendar/NewItem';
import List from '../components/List';
import FirebaseContext from '../context/FirebaseContext';
import { generateHash } from '../utils/health-plan-utils';

const healthPlanName = (item: DataItem, healthPlanHash: HealthPlanHash) =>
  healthPlanHash && item.healthPlanId ? healthPlanHash[item.healthPlanId] : 'Particular';

const columns = ['Horário', 'Paciente', 'Convênio'];

const EventList = ({ firestore }: { firestore: Firestore }) => {
  const [healthPlanHash, setHealthPlanHash] = useState({});
  const { firestorePath } = useContext(FirebaseContext);

  const cells = [
    { format: (item: DataItem) => moment(item.start.toDate()).format('DD/MM/YYYY HH:mm') },
    { format: (item: DataItem) => item.customer.name },
    { format: (item: DataItem) => healthPlanName(item, healthPlanHash) },
    {
      format: (item: DataItem) => `[${healthPlanName(item, healthPlanHash)}] ${item.customer.name}`,
    },
  ];
  const newItem = (props: unknown) => <NewItem healthPlanHash={healthPlanHash} {...props} />;
  const editItem = (props: { item: { customer: { name: unknown }; healthPlan: unknown } }) => {
    const { item, ...rest } = props;
    const title = item.customer.name + ' - ' + item.healthPlan;
    const newProps = { title, ...item, ...rest };
    return <NewItem healthPlanHash={healthPlanHash} {...newProps} />;
  };

  useEffect(() => {
    return firestore.collection(`${firestorePath}/HealthPlans`).onSnapshot((snapshot: Snapshot) => {
      const healthPlanHash = generateHash(snapshot);
      setHealthPlanHash(healthPlanHash);
    });
  }, [firestore, firestorePath]);

  return (
    <List
      cells={cells}
      columns={columns}
      createButtonText="Nova consulta"
      editItem={editItem}
      newItem={newItem}
      title="Consultas"
      emptyMessage="Nenhuma consulta encontrada"
      path="Events"
      sort="start:desc"
    />
  );
};

export default withFirestore(EventList);
