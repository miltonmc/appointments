import React, { useContext } from 'react';
import { FirestoreCollection } from 'react-firestore';
import { Form } from 'semantic-ui-react';
import FirebaseContext from '../context/FirebaseContext';

const Select = ({ isLoading, value, options, onChange, width }) => (
  <Form.Select
    loading={isLoading}
    width={width}
    search
    fluid
    label="Convênio"
    name="healthPlanId"
    value={value}
    options={[{ key: '', value: '', text: 'Particular' }, ...options]}
    placeholder="Particular"
    onChange={onChange}
  />
);

const FirestoreSelect = ({ value, onChange, width }) => {
  const { firestorePath } = useContext(FirebaseContext);

  return (
    <FirestoreCollection
      path={`${firestorePath}/HealthPlans`}
      render={({ isLoading, data }) => {
        const options = data.map((item) => ({
          key: item.id,
          value: item.id,
          text: item.name,
        }));
        return Select({ isLoading, value, options, onChange, width });
      }}
    />
  );
};

const HealthPlanSelect = (props) => (props.options ? Select(props) : FirestoreSelect(props));

export default HealthPlanSelect;
