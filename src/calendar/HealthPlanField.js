import React, { useContext } from 'react';
import { FirestoreDocument } from 'react-firestore';
import { Form } from 'semantic-ui-react';
import FirebaseContext from '../context/FirebaseContext';
import HealthPlanSelect from '../shared/HealthPlanSelect';

const HealthPlanField = ({ healthPlanHash, selectedCustomer, selectedHealthPlanId = '', onChange }) => {
  const { firestorePath } = useContext(FirebaseContext);

  //If selectedCustomerId is empty, we render a disabled Input.
  const disabledHealthPlan = (
    <Form.Input name="healtPlan" label="Plano de saúde" disabled placeholder="Escolha o Cliente" />
  );
  if (!selectedCustomer) {
    return disabledHealthPlan;
  }

  return (
    <FirestoreDocument
      path={`${firestorePath}/Customers/${selectedCustomer.id}`}
      render={({ isLoading, data: customer }) => {
        if (isLoading) {
          return disabledHealthPlan;
        }
        //if customer has a healthPlan, we add it as an option to the dropdown
        const options = [];
        const id = customer.healthPlanId;
        const name = healthPlanHash[customer.healthPlanId];
        name &&
          options.push({
            key: id,
            value: id,
            text: name,
          });
        return <HealthPlanSelect value={selectedHealthPlanId} onChange={onChange} options={options} />;
      }}
    />
  );
};

export default HealthPlanField;
