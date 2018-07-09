import { FirestoreDocument } from 'react-firestore';
import { Form } from 'semantic-ui-react';
import React from 'react';
import FirestorePath from '../shared/FirestorePath';
import HealthPlanSelect from '../shared/HealthPlanSelect';

const HealthPlanField = ({
  healthPlans,
  selectedCustomer,
  selectedHealthPlanId = '',
  onChange,
}) => {
  //If selectedCustomerId is empty, we render a disabled Input.
  const disabledHealthPlan = (
    <Form.Input
    name="healtPlan"
    label="Plano de saúde"
    disabled
    placeholder="Escolha o Cliente"
  />

  );
  if (!selectedCustomer) {
    return disabledHealthPlan;
  }

  return (
    <FirestorePath
      path={`Customers/${selectedCustomer.id}`}
      render={fullCustomerPath => (
        <FirestoreDocument
          path={fullCustomerPath}
          render={({ isLoading, data: customer }) => {
            if (isLoading) {
              return disabledHealthPlan;
            }
            //if customer has a healthPlan, we add it as an option to the dropdown
            const options = [];
            const healthPlan = healthPlans.docs.find(healthPlan => healthPlan.id === customer.healthPlanId)
            healthPlan && options.push({ key: healthPlan.id, value: healthPlan.id, text: healthPlan.data().name });
            return <HealthPlanSelect value={selectedHealthPlanId} onChange={onChange} options={options}/>
          }}
        />
      )}
    />
  );
};

export default HealthPlanField;
