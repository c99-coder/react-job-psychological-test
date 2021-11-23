import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const QuestionEX = () => {
    let history = useHistory();
    let [progress, setProgress] = useState(0)
    return (
        <div>
            <h1>검사예시<span>{progress}%</span></h1>
            <div className="progress">
                <div
                    className="progress-bar"
                    style={{ width: progress + "%" }}></div>
            </div>
            <p>직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.</p>
            <p>가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.</p>
            <div className="card text-center">
                <div className="card-header">
                    1번
                </div>
                <div className="card-body">
                    <h5 className="card-title">예시문항</h5>
                    <p className="card-text">
                        <label className="form-check-label">
                            <input
                                onClick={() => { setProgress(100) }}
                                className="form-check-input"
                                type="radio"
                                name="ex"
                                id="ex1" />
                            예시1번
                        </label>
                        <label className="form-check-label">
                            <input
                                onClick={() => { setProgress(100) }}
                                className="form-check-input"
                                type="radio"
                                name="ex"
                                id="ex2" />
                            예시2번
                        </label>
                    </p>
                </div>
            </div>
            <p><button
                type="button"
                className="btn btn-primary"
                disabled={!progress}
                onClick={() => { history.push('/question') }}
            >시작하기</button></p>
        </div>
    )
}

export default QuestionEX
