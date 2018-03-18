import React, { Component } from "react";
import * as firebase from "firebase";
import { Button, Form, Icon, Message, Modal } from 'semantic-ui-react';

class LoginWithEmail extends Component {
  state = { isOpen: false }

  show = () => this.setState({ isOpen: true })
  close = () => this.setState({ isOpen: false })

  handleLogin = (email, password) => {
    if (!email || !password) {
      this.setState({ errorMessage: "E-mail e Senha obrigatórios"});
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.close();
    }).catch(error => {
      this.setState({ errorMessage: error.message });
    });
  };

  render() {
    const { isOpen, errorMessage } = this.state;
    return (
      <div>
        <Button onClick={this.show}>
          <Icon name='mail' /> Autenticar com Email
        </Button>
        <Modal size="mini" closeIcon open={isOpen} onClose={this.close}>
          <Modal.Header icon='mail' content='Autenticar com Email' />
          <Modal.Content>
            <Form onSubmit={this.handleLogin} error={!!errorMessage}>
              <Form.Input required label='Email' onChange={(event, { value }) => { this.email = value }} />
              <Form.Input required label='Senha' onChange={(event, { value }) => { this.password = value }} type='password' />
              <Message
                error
                header='Email ou senha inválidos'
                content={errorMessage}
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={() => this.handleLogin(this.email, this.password)}>
              <Icon name='checkmark' /> Login
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
export default LoginWithEmail;