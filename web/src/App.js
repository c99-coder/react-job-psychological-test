import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {
  Route
} from 'react-router-dom';
import React, {
  useState,
  useEffect
} from 'react'

import Question from "./components/Question";
import Result from "./components/Result";
import Start from "./components/Start";
import QuestionEx from "./components/QuestionEx";

function App() {
  let [name, setName] = useState('')
  let [gender, setGender] = useState('')
  
  let questions = []
  useEffect(() => {
    axios.get("http://www.career.go.kr/inspct/openapi/test/questions?apikey=e772916f49d49980fd515f04c9ebc4ba&q=6")
      .then((response) => {
        console.log(response.data.RESULT)
        questions.push(response.data.RESULT)
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
