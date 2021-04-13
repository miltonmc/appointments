import CPF from 'cpf';
import React, { useContext, useEffect, useState } from 'react';
import { withFirestore } from 'react-firestore';
import { Form, Segment } from 'semantic-ui-react';
import FirebaseContext from '../context/FirebaseContext';

function Sponsor({ firestore, cpf: cpfProps, onChange }) {
  const { firestorePath } = useContext(FirebaseContext);
  const [cpf, setCPF] = useState(cpfProps);
  const [checked, setChecked] = useState(!!cpfProps);
  const [{ error, loading, name }, setState] = useState({ loading: !!cpfProps, name: '' });

  useEffect(() => {
    if (CPF.isValid(cpf)) {
      return firestore
        .collection(`${firestorePath}/Customers`)
        .where('cpf', '==', cpf)
        .onSnapshot((snapshot) => {
          const customers = snapshot?.docs?.[0]?.data();
          setState({
            name: customers?.name ?? '',
            loading: false,
            error: !customers,
          });
          onChange(null, { name: 'sponsor', value: customers ? cpf : '' });
        });
    } else {
      setState({
        name: '',
        loading: false,
        error: cpf.length === 11,
      });
    }
  }, [firestore, onChange, firestorePath, cpf]);

  return (
    <Segment>
      <Form.Checkbox
        toggle
        label="Responsável Financeiro"
        checked={checked}
        onChange={(e, { checked }) => setChecked(checked)}
      />
      <Form.Group>
        <Form.Input
          disabled={!checked}
          error={error}
          width={3}
          placeholder={'CPF (apenas números)'}
          name="sponsor"
          value={cpf}
          pattern="\d*"
          maxLength={11}
          onChange={(e, { name, value }) => setCPF(value)}
        />
        <Form.Input
          className="center2"
          width={13}
          disabled={!checked}
          loading={loading}
          value={name}
          icon="user"
          iconPosition="left"
          placeholder="Search..."
          readOnly
          transparent
        />
      </Form.Group>
    </Segment>
  );
}

export default withFirestore(Sponsor);
