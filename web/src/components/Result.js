import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useHistory } from 'react-router-dom';
import Snake from 'react-simple-snake';

Chart.register(CategoryScale);

const Result = (props) => {
	const [result, setResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [checkResult, setCheckResult] = useState(false);
	const [jobResult, setJobResult] = useState();
	const [majorResult, setMajorResult] = useState();
	const [modalRanking, setModalRanking] = useState(false);
	const [ranking, setRanking] = useState({});
	const [score, setScore] = useState(0);
	const [confirmedData, setConfirmedData] = useState({
		labels: [
			'능력발휘',
			'자율성',
			'보수',
			'안정성',
			'사회적 인정',
			'사회봉사',
			'자기계발',
			'창의성',
		],
		datasets: [
			{
				label: '직업가치관 결과',
				backgroundColor: 'rgba(255,99,132,0.2)',
				borderColor: 'rgba(255,99,132,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				hoverBorderColor: 'rgba(255,99,132,1)',
				data: [],
			},
		],
	});

	let history = useHistory();

	const jobInfo = {
		1: '중졸이하',
		2: '고졸',
		3: '전문대졸',
		4: '대졸',
		5: '대학원졸',
	};

	const majorInfo = {
		1: '인문',
		2: '사회',
		3: '교육',
		4: '공학',
		5: '자연',
		6: '의학',
		7: '예체능',
	};
	const questionInfo = {
		1: '능력발휘',
		2: '자율성',
		3: '보수',
		4: '안정성',
		5: '사회적 인정',
		6: '사회봉사',
		7: '자기계발',
		8: '창의성',
	};
	const fetchGetRank = () => {
		fetch(
			'http://elice-kdt-3rd-vm-102.koreacentral.cloudapp.azure.com:5000/score',
			{
				method: 'GET',
				mode: 'cors',
			},
		)
			.then((res) => {
				console.log(res);
				return res.json();
			})
			.then((data) => {
				console.log(data);
				data.sort((a, b) => {
					return b.score - a.score;
				});
				setRanking(data);
				console.log(data);
			});
	};
	useEffect(() => {
		const params = {
			apikey: 'e772916f49d49980fd515f04c9ebc4ba',
			qestrnSeq: '6',
			trgetSe: '100209',
			name: props.name,
			gender: props.gender === '남자' ? '100323' : '100324',
			startDtm: new Date().getTime(),
			answers: props.answerScores.reduce((acc, score, index) => {
				return acc + `B${index + 1}=${score} `;
			}, ''),
		};
		const fetchEvent = async () => {
			const res = await axios.post(
				'https://www.career.go.kr/inspct/openapi/test/report?apikey=e772916f49d49980fd515f04c9ebc4ba&qestrnSeq=6',
				params,
			);
			const seq = res.data.RESULT.url.split('seq=')[1];
			const res2 = await axios.get(
				'https://www.career.go.kr/inspct/api/psycho/report?seq=' + seq,
			);
			const wonScore = res2.data.result.wonScore
				.split(' ')
				.filter((x) => x);
			const result = wonScore.map((x) => {
				const split_data = x.split('=');
				return { num: split_data[0], value: parseInt(split_data[1]) };
			});

			await setConfirmedData(() => {
				let temp = { ...confirmedData };
				temp.datasets[0].data = result.map((x) => {
					return x.value;
				});
				return temp;
			});

			result.sort((a, b) => {
				return b.value - a.value;
			});
			setResult(result);
			const [value1, value2] = [result[0].num, result[1].num];
			const job_result = await axios.get(
				`https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${value1}&no2=${value2}`,
			);
			const major_result = await axios.get(
				`https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${value1}&no2=${value2}`,
			);
			setJobResult(() => {
				const temp = { 1: [], 2: [], 3: [], 4: [], 5: [] };
				job_result.data.forEach((a) => {
					temp[a[2]].push(a[1]);
				});
				return temp;
			});
			setMajorResult(() => {
				const temp = {
					0: [],
					1: [],
					2: [],
					3: [],
					4: [],
					5: [],
					6: [],
					7: [],
				};
				major_result.data.forEach((a) => {
					if (a[2] !== 0) {
						temp[0].push(a[1]);
					}
					temp[a[2]].push(a[1]);
				});
				return temp;
			});
			fetchGetRank();
			setLoading(true);
		};
		fetchEvent();
	}, []);

	if (!loading) return <div>Loading...</div>;

	const scoreHandler = (score) => {
		setScore(score);
	};
	const gameoverHandler = async () => {
		await fetch(
			'http://elice-kdt-3rd-vm-102.koreacentral.cloudapp.azure.com:5000/score',
			{
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify({
					name: props.name === '' ? 'guest' : props.name,
					score: score,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		await fetchGetRank();
	};

	const Rank = (props) => {
		console.log(props.user);
		return (
			<>
				{props.index === 1 && (
					<p
						onClick={() => {
							setModalRanking(false);
						}}
					>
						랭킹닫기(클릭)
					</p>
				)}
				<ol>
					{props.index}등 {props.user.name}님 {props.user.score}점
				</ol>
			</>
		);
	};

	if (!checkResult) {
		return (
			<div>
				<h2>검사가 완료되었습니다.</h2>
				직업생활과 관련하여 {props.name}님은{' '}
				{questionInfo[result[0].num]}(와)과{' '}
				{questionInfo[result[1].num]}(을)를 가장 중요하게 생각합니다.
				<br />
				반면에 {questionInfo[result[result.length - 1].num]},{' '}
				{questionInfo[result[result.length - 2].num]}은 상대적으로 덜
				중요하게 생각합니다.
				<article>
					<Snake
						percentageWidth={'50'}
						scoreHandler={scoreHandler}
						gameoverHandler={gameoverHandler}
					/>
				</article>
				<article>
					<br />
					{/* 신기록: 이재근님 72점 */}
					SCORE 20점 이상 달성시 결과를 확인할 수 있습니다.
					<br />
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => {
							setCheckResult(true);
						}}
						disabled={score < 20}
					>
						결과보기
					</button>
				</article>
				<div>
					{modalRanking === true ? (
						typeof ranking[0] === 'undefined' ? (
							<p>Loading...</p>
						) : (
							ranking.map((user, index) => (
								<Rank
									user={user}
									key={index}
									index={index + 1}
								/>
							))
						)
					) : (
						<p
							onClick={() => {
								setModalRanking(true);
							}}
						>
							랭킹확인(클릭)
						</p>
					)}
				</div>
			</div>
		);
	}
	return (
		<div>
			<h2>검사가 완료되었습니다.</h2>
			<p>이름: {props.name}</p>
			<p>성별: {props.gender === '남자' ? '남자' : '여자'}</p>
			<p>검사일: {new Date().toLocaleString('kor').slice(0, 14)}</p>
			<h2>1. 직업가치관 결과</h2>
			<p>
				직업생활과 관련하여 {props.name}님은{' '}
				{questionInfo[result[0].num]}(와)과{' '}
				{questionInfo[result[1].num]}(을)를 가장 중요하게 생각합니다.
				<br />
				반면에 {questionInfo[result[result.length - 1].num]},{' '}
				{questionInfo[result[result.length - 2].num]}은 상대적으로 덜
				중요하게 생각합니다.
			</p>
			<Bar
				data={confirmedData}
				width={'100px'}
				height={'50px'}
				options={{
					maintainAspectRatio: true,
				}}
			/>
			<br />
			<h2>2. 나의 가치관과 관련이 높은 직업</h2>
			<h3>종사자 평균 학력별</h3>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">분야</th>
						<th scope="col">직업명</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row" style={{ minWidth: '80px' }}>
							중졸이하
						</th>
						<td>{jobResult[1].join(' ')}</td>
					</tr>
					<tr>
						<th scope="row">고졸</th>
						<td>{jobResult[2].join(' ')}</td>
					</tr>
					<tr>
						<th scope="row">전문대졸</th>
						<td>{jobResult[3].join(' ')}</td>
					</tr>
					<tr>
						<th scope="row">대졸</th>
						<td>{jobResult[4].join(' ')}</td>
					</tr>
					<tr>
						<th scope="row">대학원졸</th>
						<td>{jobResult[5].join(' ')}</td>
					</tr>
				</tbody>
			</table>
			<br />
			<h3>종사자 평균 전공별</h3>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">분야</th>
						<th scope="col">직업명</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row" style={{ minWidth: '80px' }}>
							계열무관
						</th>
						<td>{majorResult[0].join(' ')}</td>
					</tr>
					<tr>
						<th scope="row">인문</th>
						<td>{majorResult[1].join(' ')}</td>
					</tr>
					<tr>
						<th scope="row">사회</th>
						<td>{majorResult[2].join(' ')}</td>
					</tr>
					<tr>
						<th scope="row">교육</th>
						<td>{majorResult[3].join(' ')}</td>
					</tr>
					<tr>
						<th scope="row">공학</th>
						<td>{majorResult[4].join(' ')}</td>
					</tr>
					<tr>
						<th scope="row">자연</th>
						<td>{majorResult[5].join(' ')}</td>
					</tr>
					<tr>
						<th scope="row">의학</th>
						<td>{majorResult[6].join(' ')}</td>
					</tr>
					<tr>
						<th scope="row">예체능</th>
						<td>{majorResult[7].join(' ')}</td>
					</tr>
				</tbody>
			</table>
			<p>
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => {
						history.push('/');
					}}
				>
					다시 검사하기
				</button>
			</p>
		</div>
	);
};

export default Result;
