import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import { Form } from 'semantic-ui-react';
import FirestorePath from '../components/FirestorePath';

const CustomerField = ({ selectedCustomer = '', onChange }) => (
  <FirestorePath
    path="Customers"
    render={(fullPath) => (
      <FirestoreCollection
        path={fullPath}
        render={({ isLoading, data }) => {
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
    )}
  />
);

export default CustomerField;
