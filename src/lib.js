const generateCode = level => {
  let str = Math.random()
    .toString(36)
    .substring(7);
  return str.substr(0, 3) + level + str.substr(3);
};
function getNextItem(arr, el) {
  const index = arr.indexOf(el);
  if (index < 0) {
    throw new Error("Element is not in array");
  }
  let nextel;
  if (index === arr.length - 1) {
    nextel = arr[0];
  } else {
    nextel = arr[index + 1];
  }
  return nextel;
}

export { generateCode, getNextItem };
