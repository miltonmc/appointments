import CPF from 'cpf';
import 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { withFirestore } from 'react-firestore';
import List from '../components/List';
import UserContext from '../context/UserContext';
import { generateHash } from '../utils/health-plan-utils';
import CustomerItemEditable from './EditItem';
import NewItem from './NewItem';

const cells = (healthPlanHash) => [
  { format: (item) => (item.cpf ? CPF.format(item.cpf) : null), width: 3 },
  { format: (item) => item.name },
  {
    format: (item) => (healthPlanHash && item.healthPlanId ? healthPlanHash[item.healthPlanId] : 'Particular'),
  },
];

const columns = ['CPF', 'Nome', 'Convênio'];

const newItem = (healthPlans) => (props) => <NewItem healthPlans={healthPlans} {...props} />;
const editItem = (healthPlans) => (props) => <CustomerItemEditable healthPlans={healthPlans} {...props} />;

function CustomerList({ firestore }) {
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
      createButtonText="Novo Paciente"
      editItem={editItem(healthPlans)}
      newItem={newItem(healthPlans)}
      title="Paciente"
      emptyMessage="Nenhum paciente encontrado"
      path="Customers"
    />
  );
}

export default withFirestore(CustomerList);
