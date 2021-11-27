import 'bootstrap/dist/css/bootstrap.min.css';

import { Route } from 'react-router-dom';
import React, { useState } from 'react';

import Question from './components/Question';
import Result from './components/Result';
import Start from './components/Start';
import QuestionEx from './components/QuestionEx';

function App() {
	let [name, setName] = useState('');
	let [gender, setGender] = useState('');
	let [answerScores, setAnswerScores] = useState(new Array(28).fill(0));

	const genderHandler = (gender) => {
		setGender(gender);
	};
	const nameHandler = (e) => {
		setName(e.target.value);
	};
	const getAnswerScore = (answerScores2) => {
		setAnswerScores(answerScores2);
	};
	return (
		<div className="mt-2 container-md" style={{ minWidth: '700px' }}>
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
				<Question getAnswerScore={getAnswerScore} />
			</Route>
			<Route exact path="/result">
				<Result
					answerScores={answerScores}
					gender={gender}
					name={name}
				/>
			</Route>
		</div>
	);
}

export default App;
