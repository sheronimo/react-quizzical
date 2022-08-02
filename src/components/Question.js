import './Question.css';

	const className = (answer) => {
		let name = 'answer';
		let isCorrect = answer.answer === props.correctAnswer;

		if (answer.isSelected) {
			name = name + ' answer-selected';
		}
		if (props.finished && isCorrect) {
			name = name + ' answer-correct';
		}

		if (props.finished && answer.isSelected && !isCorrect) {
			name = name + ' answer-incorrect';
		}

		return name;
	};
	return (
		<div className='question-group'>
			<h2>How would one say goodbye in Spanish?</h2>
			<div className='answers'>
				<button className='answer'>Adios</button>
				<button className='answer'>Hola</button>
				<button className='answer'>Au Revoir</button>
				<button className='answer'>Salir</button>
			</div>
		</div>
	);
};

export default Question;
