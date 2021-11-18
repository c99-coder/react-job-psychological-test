import React, {useState} from 'react'

const Start = () => {
    let [이름, 이름변경] = useState('')
    let [성별, 성별변경] = useState('')
    

    return (
        <div>
            <h1>직업심리검사</h1>
            <p><input
                onChange={(e) => { 이름변경(e.target.value) }}
                type="text"
                name="name"
                placeholder="이름"
            /></p>
            <input
                onClick={(e) => { 성별변경("남자") }}
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1" />
            <label
                class="form-check-label"
                for="flexRadioDefault1">
                남자
            </label>
            <input
                onClick={(e) => { 성별변경("여자") }}
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1" />
            <label
                class="form-check-label"
                for="flexRadioDefault1">
                여자
            </label>
            <p><button type="button" class="btn btn-primary">시작하기</button></p>
        </div>
    )
}

export default Start