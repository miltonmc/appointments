interface DataItem {
  id: string;
  name: string;
  [key: string]: any;
}

interface FirestoreRender {
  data: DataItem[];
  isLoading: boolean;
}

interface FirestoreCollectionProps {
  path: string;
  render: ({ isLoading, data }: FirestoreRender) => React.ReactElement<T, any>;
  sort?: string;
}

interface WithFirestoreProps {
  firestore: firebase.default.firestore.Firestore;
}

declare module 'react-firestore' {
  function withFirestore(component: React.FC<T>): React.FC<T & WithFirestoreProps>;
  function FirestoreCollection<P>(props: P): React.ReactElement<P & FirestoreCollectionProps, any>;
}
