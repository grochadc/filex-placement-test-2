import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

const Question = ({
  questionObj,
  resetOptions,
  handleSelection,
  questionIndex
}) => {
  const [checkedOption, setCheckedOption] = useState();
  useEffect(() => setCheckedOption(), [questionObj]);
  return (
    <div>
      <ul>
        <Form
          onChange={event => {
            let currentIndex = parseInt(event.target.name);
            setCheckedOption(currentIndex);
            handleSelection(questionObj.options[currentIndex].correct);
          }}
        >
          {`${questionIndex + 1}. ${questionObj.title}`}
          {questionObj.options.map((option, index) => (
            <Form.Check
              type="radio"
              label={option.text}
              key={index}
              name={index}
              checked={index === checkedOption ? true : false}
              onChange={() => true}
            />
          ))}
        </Form>
      </ul>
    </div>
  );
};
export default Question;
