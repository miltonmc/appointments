import React, { Component } from "react";
import { withFirestore } from "react-firestore";
import Item from "./Item.js";
import FirestorePath from "shared/FirestorePath";

class NewItem extends Component {
  state = {};
  handleSubmit = (fullPath, { id, ...dataToAdd }) => {
    const { firestore, onClose } = this.props;

    // if (!CNPJ.validate(cnpj)) {
    //   this.setState({
    //     errorMessage: "CNPJ inválido"
    //   });
    //   return;
    // }

    // const { firestore, onClose } = this.props;
    // const doc = firestore.doc(`${fullPath}/${cnpj}`);
    // doc.get().then(snapShot => {
    //   if (snapShot.exists) {
    //     this.setState({
    //       errorMessage: "CNPJ já existente"
    //     });
    //     return;
    //   }

    if (id) {
      firestore
        .doc(`${fullPath}/${id}`)
        .set(dataToAdd)
        .then(() => {
          onClose("Evento alterado com sucesso.");
        })
        .catch(error => {
          this.setState({
            errorMessage: error
          });
        });
    } else {
      firestore
        .collection(`${fullPath}`)
        .add(dataToAdd)
        .then(() => {
          onClose("Evento criado com sucesso.");
        })
        .catch(error => {
          this.setState({
            errorMessage: error
          });
        });
    }
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <FirestorePath
        path="Events"
        render={fullPath => (
          <Item
            title="Novo Evento"
            isNew
            errorMessage={errorMessage}
            onSubmit={data => this.handleSubmit(fullPath, data)}
            {...this.props}
          />
        )}
      />
    );
  }
}

export default withFirestore(NewItem);
