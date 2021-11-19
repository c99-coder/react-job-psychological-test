import React from 'react'
import { useHistory } from 'react-router-dom'

const Question = () => {
    let history = useHistory();
    return (
        <div>
            <h1>검사진행</h1>
            <div class="progress">
                <div class="progress-bar" role="progressbar"
                    style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <Problems />
            <p>
                <button
                type="button"
                className="btn btn-primary"
                onClick={() => { history.push('/question') }}>이전</button>
                <button
                type="button"
                className="btn btn-primary"
                onClick={() => { history.goBack() }}
                >다음</button>
            </p>
        </div>
    )
}

const Problems = () => {
    return (
        <div class="card text-center">
            <div class="card-header">
                1번
            </div>
            <div class="card-body">
                <h5 class="card-title">첫번째문항</h5>
                <p class="card-text">
                    <button></button>
                </p>
            </div>
        </div>
    )
}

export default Question
