import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Question from './Question';
import './Quiz.css';

const Quiz = () => {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [gameFinished, setGameFinished] = useState(false);
	const [score, setScore] = useState(0);
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
};

export default Quiz;
