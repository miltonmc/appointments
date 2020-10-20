/// <reference types="react-scripts" />
/// <reference types="firebase" />

interface WithFirestoreProps {
  firestore: firebase.firestore.Firestore;
}

interface DataItem {
  id: string;
  name: string;
  [key: string]: any;
}

interface FirestorePathRenderProps {
  data: DataItem[];
  isLoading: boolean;
}

// // Type definitions for react-firestore 1.0.1
// // Project: https://github.com/green-arrow/react-firestore
// // Definitions by: Milton Castro <https://github.com/miltonmc>
// // Definitions: https://github.com/miltonmc/appointments/blob/master/src/react-app-env.d.ts
// // TypeScript Version: 3.0

declare module 'react-firestore';
