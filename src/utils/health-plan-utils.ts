import firebase from 'firebase/app';
import 'firebase/auth';

export function generateHash(snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) {
  const healthPlanHash: { [key: string]: string } = {};
  snapshot &&
    snapshot.docs.forEach((healthPlan) => {
      const name = healthPlan.data().name;
      healthPlanHash[healthPlan.id] = name;
    });
  return healthPlanHash;
}
