import firebase from 'firebase/app';
import 'firebase/auth';
import { FunctionComponent, ReactElement } from 'react';

type Props = {
  path: string;
  render(fullPath: string): ReactElement;
};

const FirestorePath: FunctionComponent<Props> = ({ path, render }) => {
  const userId = firebase.auth().currentUser?.uid;
  console.assert(userId, '[components/FirestorePath] User not loaded');
  const fullPath = `/Users/${userId}/${path}`;
  return render(fullPath);
};

export default FirestorePath;
