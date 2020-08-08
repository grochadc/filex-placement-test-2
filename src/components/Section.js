import React, {useState} from "react";
import Question from "./Question";
import test from "../data/questions.json"

const generateCode = (level) => {
  let str = Math.random().toString(36).substring(7);
  return str.substr(0, 3) + level + str.substr(3)
}

const Section = ({currentSection, handleNext, handleGrade, handleGiveUp}) =>
{
  let {questions} = test.sections[currentSection]
  const [grade, setGrade] = useState(0);
  const [disableButton, setDisableButton] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [resetOptions, setResetOptions] = useState(false);
  let pass = grade > questions.length/2;
  return (
    <div>
    <h2>Seccion {currentSection + 1}</h2>
      {questions.map((question, currentSection) => {
        return (
          <Question
            questionObj={question}
            handleSelection={(selection, previousSelection) => {
              if(selection) {
                setGrade(grade + 1)
              } else if(!selection){
                if(!previousSelection){ //do nothingif last seleciton was false
                  return;
                } else if(previousSelection){
                  setGrade(grade - 1);
                }
              }
            } }
            resetOptions={resetOptions} />
        )
      })}

      <button onClick={() => {
        setDisableButton(!pass);
        setShowResult(true);
      }}>Calificar</button>{showResult ? pass ? "Pasaste esta seccion! Haz click en siguiente" : "Fallaste esta seccion. Haz click en rendirme." : null }<br />
      <button onClick={() => handleGiveUp(generateCode(currentSection + 1))}>Rendirme</button>
      <button
      disabled={disableButton}
      onClick={() => {
        handleNext();
        setGrade(0);
        setDisableButton(true);
        setShowResult(false);
        setResetOptions(true);
        window.scrollTo(0,0);
      }
    }>Siguiente</button>
    <div style={{position: "fixed", top: "5px", left:"500px"}}><strong>Calificacion:</strong> {grade} / {questions.length}<br /> <em>{pass ? "Pass" : "Fail"}</em></div>
    </div>
  );
}

export default Section;
