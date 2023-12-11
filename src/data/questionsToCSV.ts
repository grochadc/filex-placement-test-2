//const readline = require("readline");
import readline from "readline";
//const fs = require("fs");
import fs from "fs";
//const path = require("path");
import path from "path";

const readInterface = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, "./questions.json")),
});

let arr:string[] = [];

readInterface.on("line", (line:string) => {
  // arr.push(line.split(","));
  console.log("newline:",line);
});

readInterface.on("close", () => {
  const result = arr.slice(1);
  console.log("result:", result);
  /*
  fs.writeFileSync(
    path.join(__dirname, "./allowedStudents2.js"),
    `const allowedStudents=${JSON.stringify(
      allowedStudents
    )}\nexport default allowedStudents;`
  );
  */
});

export {};