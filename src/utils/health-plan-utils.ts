export function generateHash(snapshot: Snapshot) {
  const healthPlanHash: HealthPlanHash = {};
  snapshot?.docs.forEach((healthPlan) => {
    const name = healthPlan.data().name;
    healthPlanHash[healthPlan.id] = name;
  });
  return healthPlanHash;
}
