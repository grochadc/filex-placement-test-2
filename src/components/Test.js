import React from "react";
import questions from "../data/questions.json";

const Test = () => <div>{JSON.stringify(questions.sections[0].questions)}</div>;
export default Test;
