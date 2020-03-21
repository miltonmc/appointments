import React, { Component } from 'react';
import { Form, Segment } from 'semantic-ui-react';
import { withFirestore } from 'react-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import CPF from 'cpf';

class Sponsor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: !!props.cpf,
      cpf: props.cpf,
      error: false,
      loading: !!props.cpf,
      name: '',
    };

    this.handleCheck = this.handleCheck.bind(this);
    this.getCustomerByCpf = this.getCustomerByCpf.bind(this);

    this.state.checked && this.getCustomerByCpf(props.cpf);
  }

  handleChange = (e, { name, value }) => {
    const isValid = CPF.isValid(value);
    isValid && this.getCustomerByCpf(value);
    !isValid && this.props.onChange(null, { name: 'sponsor', value: '' });
    this.setState({
      cpf: value,
      error: value.length === 11 ? !isValid : false,
      loading: isValid,
      name: '',
    });
  };

  handleCheck(e, { checked }) {
    this.setState({ checked, name: '', cpf: '' });
    this.props.onChange(null, { name: 'sponsor', value: '' });
  }

  getCustomerByCpf(cpf) {
    const { firestore } = this.props;
    const user = firebase.auth().currentUser;
    const path = `/Users/${user.uid}/Customers`;
    firestore
      .collection(path)
      .where('cpf', '==', cpf)
      .onSnapshot(snapshot => {
        const name = (snapshot && snapshot.docs && snapshot.docs[0] && snapshot.docs[0].data().name) || '';
        this.setState({
          name,
          loading: false,
          error: !(snapshot && snapshot.docs && snapshot.docs[0]),
        });
        this.props.onChange(null, { name: 'sponsor', value: name ? cpf : '' });
      });
  }

  render() {
    const { checked, cpf, error, loading, name } = this.state;
    return (
      <Segment>
        <Form.Checkbox toggle label="Responsável Financeiro" checked={checked} onChange={this.handleCheck} />
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
            onChange={this.handleChange}
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
}

export default withFirestore(Sponsor);
