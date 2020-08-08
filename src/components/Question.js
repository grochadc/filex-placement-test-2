import React, {useState, useEffect} from "react";


const Question = ({questionObj, resetOptions, handleSelection}) => {
  const [checkedOption, setCheckedOption] = useState();
  const [previousSelection, setPreviousSelection] = useState("none");
  useEffect(() => setCheckedOption(), [questionObj])
  return (
  <div>
    <ul>
      <form onChange={(event) => {
          let currentIndex = parseInt(event.target.name)
          setCheckedOption(currentIndex)
          handleSelection(questionObj.options[currentIndex].correct)
          setPreviousSelection(questionObj.options[currentIndex].correct)
        } }>
    {questionObj.title}
    {questionObj.options.map((option, index) => (
      <li>
        <input type="radio" key={index} name={index} checked={index === checkedOption ? true : false} /> {option.text}
      </li>
    ))}
  </form>
  </ul>
  </div>
)};
export default Question;
