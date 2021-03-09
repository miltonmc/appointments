import firebase from 'firebase/app';

export function generateHash(snapshot: Snapshot) {
  const healthPlanHash: HealthPlanHash = {};
  snapshot?.docs.forEach((healthPlan) => {
    const name = healthPlan.data().name;
    healthPlanHash[healthPlan.id] = name;
  });
  return healthPlanHash;
}

type Snapshot = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
