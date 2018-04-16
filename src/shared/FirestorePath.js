import firebase from 'firebase';

const FirestorePath = (props) => {
  const user = firebase.auth().currentUser;
  const fullPath = `/Users/${user.uid}/${props.path}`;
  return props.render(fullPath);
}

export default FirestorePath;