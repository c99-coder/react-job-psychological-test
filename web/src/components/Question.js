import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Question = (props) => {
    let [loading, setLoading] = useState(false)
    let [qitemNo, setqitemNo] = useState(0)
    let [questions, setQuestions] = useState([])
    let [answerScores, setAnswerScores] = useState(new Array(28).fill(0))
    let history = useHistory();
    useEffect(() => {
        const fetchEvent = async () => {
            await axios.get("http://www.career.go.kr/inspct/openapi/test/questions?apikey=e772916f49d49980fd515f04c9ebc4ba&q=6")
                .then((res) => {
                    setQuestions(res.data.RESULT)
                })
            setLoading(true)
        }
        fetchEvent();
    }, [])
    
    if (!loading)
        return <div>Loading...</div>;
    
    const onClick = (answerScore, qitemNo) => {
        let temp = [...answerScores]
        temp[qitemNo-1] = answerScore
        setAnswerScores(temp)
    }
    
    const isFistPage = qitemNo === 0
    const isLastPage = Math.floor((qitemNo + 1) * 5 / questions.length)
    
    return (
        <div>
            <h1>검사진행<span>{`${parseInt(answerScores.filter(e => e !== 0).length / 28 * 100)}%` }</span></h1>
            <div className="progress">
                <div
                    className="progress-bar"
                    style={{ width: `${answerScores.filter(e=>e!==0).length/28*100}%` }}></div>
            </div>
            <div className="card text-center">
                <div className="card-header">
                    두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요.
                </div>
                {questions.slice(qitemNo * 5, qitemNo * 5 + 5).map((question) =>
                    <Problems score={answerScores[question["qitemNo"]-1]} onClick={onClick} question={question} key={question["qitemNo"]}/>
                )}
            </div>
            <p>
                {!isFistPage &&
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => { setqitemNo(qitemNo - 1) }}
                    >
                        이전
                    </button>
                }
                {!isLastPage ?
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => { setqitemNo(qitemNo + 1) }}
                        disabled={answerScores.slice(qitemNo * 5, qitemNo * 5 + 5).filter(e => e === 0).length!==0}
                    >
                        다음
                    </button>
                    :
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            props.getAnswerScore(answerScores)
                            history.push('/result')
                        }}
                        disabled={answerScores.slice(qitemNo * 5, qitemNo * 5 + 5).filter(e => e === 0).length !== 0}
                    >
                        제출
                    </button>
                }
            </p>
        </div>
    )
}


const Problems = (props) => {
    return(
        <div className="card-body">
            <h5 className="card-title">{props.question["answer01"]} vs {props.question["answer02"]}</h5>
            <p className="card-text">
                <label className="form-check-label">
                    <input
                        defaultChecked={props.score===props.question["answerScore01"]}
                        onClick={() => { props.onClick(props.question["answerScore01"], props.question["qitemNo"]) }}
                        className="form-check-input"
                        type="radio"
                        name={`name${props.question["qitemNo"]}`}
                        id={`id${props.question["qitemNo"]}`} />
                    {props.question["answer03"]}
                </label>
                <br />
                <label className="form-check-label">
                    <input
                        defaultChecked={props.score === props.question["answerScore02"]}
                        onClick={() => { props.onClick(props.question["answerScore02"], props.question["qitemNo"]) }}
                        className="form-check-input"
                        type="radio"
                        name={`name${props.question["qitemNo"]}`}
                        id={`id${props.question["qitemNo"]}`} />
                    {props.question["answer04"]}
                </label>
            </p>
        </div>
    )
}

export default Question
