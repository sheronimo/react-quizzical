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
			<h2 dangerouslySetInnerHTML={{ __html: props.question }}></h2>
			<div className='answers'>
				{props.answers.map((a) => (
					<button
						disabled={props.finished}
						key={a.id}
						id={a.id}
						className={className(a)}
						onClick={props.selectAnswer}
						dangerouslySetInnerHTML={{ __html: a.answer }}></button>
				))}
			</div>
		</div>
	);
};

export default Question;
