import React, {useState} from "react";

const Result = ({code}) => {
  const [showAlert, setShowAlert] = useState(false);
  return (
    <div>
      <h2>Nivel Filex: {code.charAt(3)}</h2>
      <p>Tu codigo para inscribirte es:<br />
      <input type="text" value={code} />{" "}
      <button onClick={() => {
        navigator.clipboard.writeText(code)
        setShowAlert(true);
      }}>Copiar Codigo</button> {showAlert ? "Copiado!" : null}</p>
    </div>
  )
}

export default Result;
