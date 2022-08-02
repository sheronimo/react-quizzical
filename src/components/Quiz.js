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

};

export default Quiz;
