import React from 'react';
import { useHistory } from 'react-router-dom';

const Start = (props) => {
	let history = useHistory();
	return (
		<div>
			<h1>직업가치관검사</h1>
			<div>
				<input
					onChange={props.onName}
					type="text"
					name="name"
					placeholder="이름"
				/>
			</div>
			<label className="mt-2 form-check-label">
				<input
					onClick={() => {
						props.onGender('남자');
					}}
					className="form-check-input"
					type="radio"
					name="flexRadioDefault"
					id="flexRadioDefault1"
				/>
				남자
			</label>
			<label className="ms-2 form-check-label">
				<input
					onClick={() => {
						props.onGender('여자');
					}}
					className="form-check-input"
					type="radio"
					name="flexRadioDefault"
					id="flexRadioDefault2"
				/>
				여자
			</label>
			<p>
				<button
					type="button"
					className="mt-2 btn btn-lg btn-primary"
					disabled={!props.name || !props.gender}
					onClick={() => {
						history.push('/ex');
					}}
				>
					시작하기
				</button>
			</p>
		</div>
	);
};

export default Start;
