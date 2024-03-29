import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Question from './Question';
import './Quiz.css';

const Quiz = () => {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [gameFinished, setGameFinished] = useState(false);
	const [score, setScore] = useState(0);

	useEffect(() => {
		fetchQuestions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const questionElements = questions.map((q) => {
		return (
			<Question
				key={q.id}
				question={q.question}
				answers={q.answers}
				correctAnswer={q.correctAnswer}
				selectAnswer={(e) => selectAnswer(q.id, e.target.id)}
				finished={gameFinished}
			/>
		);
	});

	function fetchQuestions() {
		setLoading(true);
		fetch(
			'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple'
		)
			.then((res) => res.json())
			.then((data) =>
				setQuestions(
					data.results.map((r) => ({
						id: nanoid(),
						question: r.question,
						correctAnswer: r.correct_answer,
						answers: returnAnswers(
							shuffleArray([r.correct_answer, ...r.incorrect_answers])
						)
					}))
				)
			)
			.finally(() => {
				setLoading(false);
			});
	}

	function returnAnswers(arr) {
		return arr.map((item) => ({
			id: nanoid(),
			answer: item,
			isSelected: false
		}));
	}

	function shuffleArray(array) {
		let i = array.length - 1;
		for (; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	function resetQuiz() {
		setGameFinished(false);
		fetchQuestions();
		setScore(0);
	}

	function selectAnswer(qId, aId) {
		setQuestions((prevQuestions) =>
			prevQuestions.map((q) =>
				q.id !== qId
					? q
					: {
							...q,
							answers: q.answers.map((a) =>
								a.id !== aId
									? { ...a, isSelected: false }
									: { ...a, isSelected: true }
							)
					  }
			)
		);
	}

	function checkAnswers() {
		questions.forEach((q) => {
			const selectedAnswer = q.answers.find((a) => a.isSelected);

			if (selectedAnswer) {
				if (selectedAnswer.answer === q.correctAnswer) {
					setScore((prevScore) => prevScore + 1);
				}
			}
		});

		setGameFinished(true);
	}

	return loading ? (
		<p>Loading questions...</p>
	) : (
		<div className='quiz'>
			{questionElements}
			{gameFinished ? (
				<div className='finished'>
					<p className='score'>You scored {score}/5 correct answers</p>
					<button className='btn quiz-btn' onClick={resetQuiz}>
						Play Again
					</button>
				</div>
			) : (
				<div className='finished'>
					<button className='btn quiz-btn' onClick={checkAnswers}>
						Check Answers
					</button>
				</div>
			)}
		</div>
	);
};

export default Quiz;
