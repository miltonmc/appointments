import firebase from 'firebase';

const FirestorePath = (props) => {
  const user = firebase.auth().currentUser;
  const fullPath = `/users/${user.uid}/${props.path}`;
  return props.render(fullPath);
}

export default FirestorePath;