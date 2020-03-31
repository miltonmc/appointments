import { FirestoreCollection, withFirestore } from 'react-firestore';
import { Form } from 'semantic-ui-react';
import React, { Component } from 'react';
import FirestorePath from './FirestorePath';

const select = ({ isLoading, value, options, onChange, width }) => (
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

const firestoreSelect = ({ value, onChange, width }) => (
  <FirestorePath
    path="HealthPlans"
    render={(fullPath) => (
      <FirestoreCollection
        path={fullPath}
        render={({ isLoading, data }) => {
          const options = data.map((item) => ({
            key: item.id,
            value: item.id,
            text: item.name,
          }));
          return select({ isLoading, value, options, onChange, width });
        }}
      />
    )}
  />
);

class HealthPlanSelect extends Component {
  render() {
    return this.props.options ? select(this.props) : firestoreSelect(this.props);
  }
}
export default withFirestore(HealthPlanSelect);
