import React from 'react'
import { useHistory } from 'react-router-dom'

const Start = (props) => {
    let history = useHistory();
    return (
        <div>
            <h1>직업심리검사</h1>
            <p><input
                onChange={props.onName}
                type="text"
                name="name"
                placeholder="이름"
            /></p>
            <input
                onClick={() => { props.onGender("남자") }}
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1" />
            <label
                className="form-check-label"
                htmlFor="flexRadioDefault1">
                남자
            </label>
            <input
                onClick={() => { props.onGender("여자") }}
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1" />
            <label
                className="form-check-label"
                htmlFor="flexRadioDefault1">
                여자
            </label>
            <p><button
                type="button"
                className="btn btn-primary"
                disabled={!props.name || !props.gender}
                onClick={() => { history.push('/ex') }}
            >시작하기</button></p>
        </div>
    )
}

export default Start