import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Button, Form, Icon, Message, Modal } from 'semantic-ui-react';

export default function LoginWithEmail() {
  const [isVisible, setVisibility] = useState(false);
  const [error, setError] = useState();
  let email;
  let password;

  function close() {
    setVisibility(false);
  }

  function handleLogin() {
    if (!email || !password) {
      setError('E-mail e Senha obrigatórios');
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(close)
      .catch(({ message }) => setError(message));
  }

  return (
    <div>
      <Button onClick={() => setVisibility(true)}>
        <Icon name="mail" /> Autenticar com Email
      </Button>
      <Modal size="mini" closeIcon open={isVisible} onClose={close}>
        <Modal.Header icon="mail" content="Autenticar com Email" />
        <Modal.Content>
          <Form onSubmit={handleLogin} error={!!error}>
            <Form.Input required label="Email" onChange={(event, { value }) => (email = value)} />
            <Form.Input required label="Senha" onChange={(event, { value }) => (password = value)} type="password" />
            <Message error header="Email ou senha inválidos" content={error} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="blue" onClick={handleLogin}>
            <Icon name="checkmark" /> Login
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
