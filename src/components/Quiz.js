import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Question from './Question';
import './Quiz.css';

const Quiz = () => {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [gameFinished, setGameFinished] = useState(false);
	const [score, setScore] = useState(0);
};

export default Quiz;
