import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { finishExam, advanceLevel } from "../store/actions";
import { gql, useQuery } from "@apollo/client";
import Question from "./Question";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

import { RootState } from "../store/types";

const TEST_SECTION_QUERY = gql`
  query($course: String!, $level: Int!) {
    section(course: $course, level: $level) {
      questions {
        title
        options {
          text
          correct
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const replaceAt = (arr: any, index: number, value: any) => [
  ...arr.slice(0, index),
  value,
  ...arr.slice(index + 1),
];

const sumArray = (arr: any) => arr.reduce((acc: any, curr: any) => acc + curr);

const Section: React.FC<any> = (props) => {
  const { level, course } = useSelector((state: RootState) => state.system);
  const { data, loading, error } = useQuery(TEST_SECTION_QUERY, {
    variables: { course: "en", level: level },
  });

  const questions = data ? data.section.questions : [];
  const [answers, setAnswers] = useState(new Array(questions.length).fill(0));
  const [checked, setChecked] = useState(new Array(questions.length).fill(0));
  const [resetOptions, setResetOptions] = useState(false);

  const grade = answers.length ? sumArray(answers) : 0;
  let pass = grade > questions.length / 2;
  let answeredMin = checked.length
    ? sumArray(checked) > questions.length / 2
    : false;

  const dispatch = useDispatch();
  const nextLevel = (pass: boolean) =>
    pass ? dispatch(advanceLevel()) : dispatch(finishExam());

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error... {JSON.stringify(error)}</p>;
  }

  return (
    <div>
      <Jumbotron>
        <h1>EXAMEN DE UBICACION FILEX</h1>
        <h2>{course === "en" ? "Inglés" : "Francés"}</h2>
        <h3>Seccion {level}</h3>
      </Jumbotron>
      {questions.map((question: any, index: number) => {
        return (
          <Question
            key={index}
            handleSelection={(correct: boolean) => {
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
      <Button variant="primary" onClick={() => props.handleGiveup()}>
        Rendirse
      </Button>
      {!data.hasNextPage ? ( //last section?
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
          Continuar Exámen
        </Button>
      ) : null}
    </div>
  );
};

export default Section;
