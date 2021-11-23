import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Question = () => {
    let history = useHistory();
    let [qNo, setQNo] = useState()
    return (
        <div>
            <h1>검사진행<span>0%</span></h1>
            <div className="progress">
                <div
                    className="progress-bar"
                    style={{ width: "0%" }}></div>
            </div>
            <Problems />
            <p>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => { history.goBack() }}
                >
                    이전
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => { history.push('/question') }}
                >
                    다음
                </button>
            </p>
        </div>
    )
}

const Problems = () => {
    return (
        <div className="card text-center">
            <div className="card-header">
                두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요.
            </div>
            <div className="card-body">
                <h5 className="card-title">능력발휘 vs 자율성</h5>
                <p className="card-text">
                    <label className="form-check-label">
                        <input
                            onClick={() => { }}
                            className="form-check-input"
                            type="radio"
                            name="answer1"
                            id="ex1" />
                        직업을 통해 자신의 능력을 발휘하는 것입니다.
                    </label>
                    <label className="form-check-label">
                        <input
                            onClick={() => { }}
                            className="form-check-input"
                            type="radio"
                            name="ex1"
                            id="ex2" />
                        일하는 시간과 방식에 대해서 스스로 결정할 수 있는 것입니다.
                    </label>
                </p>
                <h5 className="card-title">창의성 vs 안정성</h5>
                <p className="card-text">
                    <label className="form-check-label">
                        <input
                            onClick={() => { }}
                            className="form-check-input"
                            type="radio"
                            name="ex2"
                            id="ex1" />
                        스스로 아이디어를 내어 새로운 일을 해볼 수 있는 것입니다.
                    </label>
                    <label className="form-check-label">
                        <input
                            onClick={() => { }}
                            className="form-check-input"
                            type="radio"
                            name="ex2"
                            id="ex2" />
                        한 직장에서 오랫동안 일할 수 있는 것입니다.
                    </label>
                </p>
            </div>
        </div>
    )
}

export default Question
