const readline = require("readline");
const fs = require("fs");
const path = require("path");

const readInterface = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, "./allowedStudents.csv")),
});

let arr = [];

readInterface.on("line", (line) => {
  arr.push(line.split(",")[5]);
});

readInterface.on("close", () => {
  const allowedStudents = arr.slice(1);
  fs.writeFileSync(
    path.join(__dirname, "./allowedStudents2.js"),
    `const allowedStudents=${JSON.stringify(
      allowedStudents
    )}\nexport default allowedStudents;`
  );
});
