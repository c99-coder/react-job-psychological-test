import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./components/Question";
import Result from "./components/Result";
import Start from "./components/Start";
import QuestionEx from "./components/QuestionEx";
import {
  Route
} from 'react-router-dom';
import React, {
  useState,
  useEffect
} from 'react'

import axios from 'axios;'

function App() {
  let [name, setName] = useState('')
  let [gender, setGender] = useState('')
  
  useEffect(() => {
    axios.get('"www.career.go.kr/inspct/openapi/test/questions?apikey=fdedeadd7ba2b8dd6c1d7b7a1ea90489&q=6"')
      .then((response) => {
        console.log(response)
      })
    .catch((error) => {})
  },[])
  

  const genderHandler = (gender) => {
    setGender(gender)
  }
  const nameHandler = (e) => {
    setName(e.target.value)
  }
  return (
    <div>
      <Route exact path="/">
        <Start
          gender={gender}
          name={name}
          onGender={genderHandler}
          onName={nameHandler}
        />
      </Route>
      <Route exact path="/ex">
        <QuestionEx />
      </Route>
      <Route exact path="/question">
        <Question />
      </Route>
      <Route exact path="/result">
        <Result />
      </Route>
    </div>
  );
}

export default App;
