import { withFirestore } from 'react-firestore';
import { format } from 'cnpj';
import React from 'react';
import EditItem from './EditItem';
import NewItem from './NewItem';
import List from '../shared/List';

const cells = [{ format: item => format(item.cnpj), width: 3 }, { format: item => item.name }];

const columns = ['CNPJ', 'Nome'];

const HealthPlanList = () => (
  <List
    cells={cells}
    columns={columns}
    createButtonText="Novo Convênio"
    editItem={props => <EditItem {...props} />}
    newItem={props => <NewItem {...props} />}
    title="Convênios"
    emptyMessage="Nenhum convênio encontrado"
    path="HealthPlans"
  />
);

export default withFirestore(HealthPlanList);
