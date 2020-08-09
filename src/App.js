import React, {useState} from "react";
import Section from "./components/Section"
import Result from "./components/Result"

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [finished, setFinished] = useState(false);
  const [lastSection, setLastSection] = useState(false);
  const [code, setCode] = useState('noc1ode');
  return (<div>
    {!finished ? <Section
      currentSection={currentSection}
      handleGiveUp={(newCode) => {
        setFinished(true);
        setCode(newCode);
      }}
      handleNext={() => { setCurrentSection(currentSection + 1) }}
       /> : null}
     {finished ? <Result code={code} /> : null}
  </div>)
}

export default App;
