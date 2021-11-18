import "bootstrap/dist/css/bootstrap.min.css";
import Start from "./components/Start";
import Question from "./components/Question";
import Result from "./components/Result";
import {
  Route
} from 'react-router-dom';

import React from 'react'

function App() {
  return (
    <div>
      <Route exact path="/">
        <Start />
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
