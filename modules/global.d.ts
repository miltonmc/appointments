interface Appointment {
  id?: string;
  title?: string;
  start: Date;
  end: Date;
  customer?: {};
  healthPlanId?: string;
  notes?: string;
}

interface HealthPlan {
  id: string;
  name?: string;
}

interface HealthPlanHash {
  [key: string]: string;
}

type Snapshot = firebase.default.firestore.QuerySnapshot<firebase.default.firestore.DocumentData>;
