import firebase from 'firebase/app';
import 'firebase/auth';

const FirestorePath = (props) => {
  const user = firebase.auth().currentUser;
  const fullPath = `/Users/${user.uid}/${props.path}`;
  return props.render(fullPath);
};

export default FirestorePath;
