import React from "react";

const Result = ({ code, currentLink, level}) => {
  return (
    <div>
      <h2>Nivel Filex: {level}</h2>
      <p>Examen Oral: <a href={currentLink}>{currentLink}</a></p>
    </div>
  );
};

export default Result;
