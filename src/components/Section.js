import React, { useState } from "react";
import Question from "./Question";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import englishTest from "../data/questions.json";
import frenchTest from "../data/questions_french.json";

const replaceAt = (arr, index, value) => [
  ...arr.slice(0, index),
  value,
  ...arr.slice(index + 1)
];

const sumArray = arr => arr.reduce((acc, curr) => acc + curr);

const Section = ({
  handleNext,
  handleGrade,
  handleGiveUp,
  nextLevel,
  currentSection,
  curso
}) => {
  let test = curso === "english" ? englishTest : frenchTest;
  let { questions } = test.sections[currentSection - 1];
  const [resetOptions, setResetOptions] = useState(false);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(0));
  const [checked, setChecked] = useState(new Array(questions.length).fill(0));
  const grade = sumArray(answers);
  let pass = grade > questions.length / 2;
  let answeredMin = sumArray(checked) > questions.length / 2;

  return (
    <div>
      <Jumbotron>
        <h1>EXAMEN DE UBICACION FILEX</h1>
        <h2>{curso === "english" ? "Inglés" : "Francés"}</h2>
        <h3>Seccion {currentSection}</h3>
      </Jumbotron>
      {questions.map((question, index) => {
        return (
          <Question
            key={index}
            handleSelection={correct => {
              setAnswers(replaceAt(answers, index, correct ? 1 : 0));
              setChecked(replaceAt(checked, index, 1));
            }}
            questionObj={question}
            questionIndex={index}
            resetOptions={resetOptions}
          />
        );
      })}
      <br />

      <Button variant="primary" onClick={() => handleGiveUp()}>
        Terminar Examen
      </Button>
      {!(currentSection === test.sections.length) ? ( //last section?
        <Button
          disabled={!answeredMin}
          variant="primary"
          onClick={() => {
            nextLevel(pass);
            setAnswers(new Array(questions.length).fill(0));
            setChecked(new Array(questions.length).fill(0));
            setResetOptions(true);
            window.scrollTo(0, 0);
          }}
        >
          Siguiente Seccion
        </Button>
      ) : null}
    </div>
  );
};

export default Section;
