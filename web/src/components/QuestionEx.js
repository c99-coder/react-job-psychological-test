import React from 'react'
import { useHistory } from 'react-router-dom'

const QuestionEX = () => {
    let history = useHistory();
    return (
        <div>
            <h1>검사예시<span>25%</span></h1>
            
            <div className="progress">
                <div className="progress-bar" role="progressbar"
                    style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <p>직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.</p>
            <p>가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.</p>
            <p><button
                type="button"
                className="btn btn-primary"
                onClick={() => { history.push('/question') }}
            >시작하기</button></p>
        </div>
        
    )
}

export default QuestionEX
