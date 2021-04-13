/// <reference types="react-scripts" />

interface WithFirestoreProps {
  firestore: firebase.firestore.Firestore;
}

interface DataItem {
  id: string;
  name: string;
  [key: string]: any;
}

interface Appointment {
  id?: string;
  title?: string;
  start: Date;
  end: Date;
  customer?: {};
  healthPlanId?: string;
  notes?: string;
}

interface FirestoreRender {
  data: DataItem[];
  isLoading: boolean;
}

interface HealthPlan {
  id: string;
  name?: string;
}

interface HealthPlanHash {
  [key: string]: string;
}

declare module 'react-firestore';
declare module 'react-big-calendar';
