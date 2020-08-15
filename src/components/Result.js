import React from "react";

const Result = ({ code, currentLink, level, dbError }) => {
  return (
    <div>
      <h2>Nivel Filex: {level}</h2>
      {!dbError ? <p>Tu examen se envio correctamente</p> : dbError}
      {level > 1 && (
        <p>
          Examen Oral: <a href={currentLink}>{currentLink}</a>
        </p>
      )}
    </div>
  );
};

export default Result;
