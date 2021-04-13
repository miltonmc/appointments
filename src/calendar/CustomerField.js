import React, { useContext } from 'react';
import { FirestoreCollection } from 'react-firestore';
import { Form } from 'semantic-ui-react';
import FirebaseContext from '../context/FirebaseContext';

const CustomerField = ({ selectedCustomer = '', onChange }) => {
  const { firestorePath } = useContext(FirebaseContext);
  return (
    <FirestoreCollection
      path={`${firestorePath}/Customers`}
      render={({ data }) => {
        const customers = data.map((item) => ({
          key: item.id,
          value: item,
          text: item.name,
        }));
        return (
          <Form.Dropdown
            label="Cliente"
            name="customer"
            placeholder="Selecionar Cliente"
            value={selectedCustomer}
            fluid
            search
            selection
            options={customers}
            onChange={onChange}
            required
          />
        );
      }}
    />
  );
};

export default CustomerField;
