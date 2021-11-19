import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./components/Question";
import Result from "./components/Result";
import Start from "./components/Start";
import QuestionEx from "./components/QuestionEx";
import {
  Route,
  useHistory
} from 'react-router-dom';
import React, {
  useState
} from 'react'

function App() {
  let [name, setName] = useState('')
  let [gender, setGender] = useState('')
  
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
