import React, {useState, useEffect} from "react";
import Question from "./Question";
import test from "../data/questions.json"

const replaceAt = (arr, index, value) => [...arr.slice(0,index), value, ...arr.slice(index+1)]

const Section = ({handleNext, handleGrade, handleGiveUp, nextLevel, currentSection, setCode}) =>
{
  let {questions} = test.sections[currentSection-1]
  useEffect(() => {
    setCode(currentSection)
  },[currentSection, setCode])
  const [disableButton, setDisableButton] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [resetOptions, setResetOptions] = useState(false);
  const [answers, setAnswers] = useState((new Array(questions.length)).fill(0))
  const grade = answers.reduce((acc, curr) => acc + curr );
  let pass = grade > questions.length/2;
  return (
    <div>
    <h2>Seccion {currentSection}</h2>
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

    {showResult ? pass ? "Pasaste esta seccion! Haz click en siguiente" : "Fallaste esta seccion. Haz click en terminar examen." : null }<br />

    <button onClick={() => handleGiveUp(currentSection)}>Terminar Examen</button>
      { !(currentSection === test.sections.length) ? //last section?
      <button
          disabled={disableButton}
          onClick={() => {
            nextLevel()
            setAnswers((new Array(questions.length)).fill(0))
            setDisableButton(true);
            setShowResult(false);
            setResetOptions(true);
            window.scrollTo(0,0);
          }
        }>Siguiente</button> : null
      }
  <div style={{position: "fixed", top: "5px", left:"500px"}}><strong>Calificacion:</strong> {grade} / {questions.length}<br /> <em>{pass ? "Pass" : "Fail"}</em></div>
    </div>
  );
}

export default Section;
