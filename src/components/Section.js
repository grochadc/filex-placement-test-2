import React, {useState} from "react";
import Question from "./Question";
import test from "../data/questions.json"

const generateCode = (level) => {
  let str = Math.random().toString(36).substring(7);
  return str.substr(0, 3) + level + str.substr(3)
}
const replaceAt = (arr, index, value) => [...arr.slice(0,index), value, ...arr.slice(index+1)]

const Section = ({currentSection, handleNext, handleGrade, handleGiveUp}) =>
{
  let {questions} = test.sections[currentSection]
  const [grade, setGrade] = useState(0);
  const [disableButton, setDisableButton] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [resetOptions, setResetOptions] = useState(false);
  const [answers, setAnswers] = useState((new Array(questions.length)).fill(0))
  const newGrade = answers.reduce((acc, curr) => acc + curr );
  let pass = newGrade > questions.length/2;
  return (
    <div>
    <h2>Seccion {currentSection + 1}</h2>
      {questions.map((question, index) => {
        return (
          <Question
            handleSelection={(correct) => setAnswers(replaceAt(answers, index, correct ? 1 : 0))}
            questionObj={question}
            resetOptions={resetOptions} />
        )
      })}

      <button onClick={() => {
        setDisableButton(!pass);
        setShowResult(true);
      }}>Calificar</button>

      {showResult ? pass ? "Pasaste esta seccion! Haz click en siguiente" : "Fallaste esta seccion. Haz click en rendirme." : null }<br />
    <button onClick={() => handleGiveUp(generateCode(currentSection + 1))}>Terminar Examen</button>
      { !(currentSection + 1 == test.sections.length) ? //last section?
      <button
          disabled={disableButton}
          onClick={() => {
            handleNext();
            setGrade(0);
            setAnswers((new Array(questions.length)).fill(0))
            setDisableButton(true);
            setShowResult(false);
            setResetOptions(true);
            window.scrollTo(0,0);
          }
        }>Siguiente</button> : null
      }
  <div style={{position: "fixed", top: "5px", left:"500px"}}><strong>Calificacion:</strong> {newGrade} / {questions.length}<br /> <em>{pass ? "Pass" : "Fail"}</em></div>
    </div>
  );
}

export default Section;
