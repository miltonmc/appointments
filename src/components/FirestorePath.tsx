import { FunctionComponent, ReactElement, useContext } from 'react';
import UserContext from '../context/UserContext';

type Props = {
  path: string;
  render(fullPath: string): ReactElement;
};

const FirestorePath: FunctionComponent<Props> = ({ path, render }) => {
  const { uid } = useContext(UserContext);
  console.assert(uid, '[components/FirestorePath] User not loaded');
  const fullPath = `/Users/${uid}/${path}`;
  return render(fullPath);
};

export default FirestorePath;
