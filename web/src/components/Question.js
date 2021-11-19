import React from 'react'
import { useHistory } from 'react-router-dom'

const Question = () => {
    let history = useHistory();
    return (
        <div>
            <h1>검사진행</h1>
            <div className="progress">
                <div className="progress-bar" role="progressbar"
                    style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <Problems />
            <p>
                <button
                type="button"
                className="btn btn-primary"
                    onClick={() => { history.goBack() }}>이전</button>
                <button
                type="button"
                className="btn btn-primary"
                    onClick={() => { history.push('/question') }}
                >다음</button>
            </p>
        </div>
    )
}

const Problems = () => {
    return (
        <div className="card text-center">
            <div className="card-header">
                1번
            </div>
            <div className="card-body">
                <h5 className="card-title">첫번째문항</h5>
                <p className="card-text">
                    <button></button>
                </p>
            </div>
        </div>
    )
}

export default Question
