export function getOddItem<Type>(original: Type[], modified: Type[]): Type {
  if (original.length !== modified.length) return modified[modified.length - 1];
  const oddItemIndex = modified.reduce(
    (acc, curr, i) => (!shallowEqual(curr, original[i]) ? i : acc + 0),
    -1
  );
  return modified[oddItemIndex];
}

function shallowEqual(objA: any, objB: any): boolean {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (objA[key] !== objB[key]) return false;
  }
  return true;
}

export function generateId() {
  let str = Math.random().toString(36).substring(7);
  return str;
}


export function tableReducer<Row>(state: Row[], action: {type: any, payload: any }): Row[] {
  return state;
}
