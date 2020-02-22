import React from 'react';
import { Form } from 'semantic-ui-react';
import { FirestoreCollection } from 'react-firestore';
import FirestorePath from 'shared/FirestorePath';

export default ({ selectedCustomer = '', onChange }) => (
  <FirestorePath
    path="Customers"
    render={fullPath => (
      <FirestoreCollection
        path={fullPath}
        render={({ isLoading, data }) => {
          const customers = data.map(item => {
          return ({
            key: item.id,
            value: item,
            text: item.name
          })});
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
