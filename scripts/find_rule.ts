import subscription from '../src/subscription.js';

console.log('--- Categories ---');
const cat =
  subscription.categories?.find((c) => c.key === 11) ||
  subscription.categories?.[11];
console.log('Category 11:', cat);

console.log('--- Global Groups ---');
const globalGroup =
  subscription.globalGroups?.find((g) => g.key === 3) ||
  subscription.globalGroups?.[3];
console.log('Global Group 3:', globalGroup);

console.log('--- Apps ---');
const app892 = subscription.apps?.[892 - 1]; // Assume 1-based index
console.log('App 892:', app892?.id, app892?.name);

let ruleCounter = 0;
let foundRule = null;
for (const app of subscription.apps || []) {
  for (const group of app.groups || []) {
    ruleCounter++;
    if (ruleCounter === 2092) {
      foundRule = {
        appId: app.id,
        appName: app.name,
        group: group.name,
        groupKey: group.key,
      };
      break;
    }
  }
  if (foundRule) break;
}

console.log('Rule 2092:', foundRule);
