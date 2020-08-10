const generateCode = (level) => {
  let str = Math.random().toString(36).substring(7);
  return str.substr(0, 3) + level + str.substr(3)
}

export {generateCode};
