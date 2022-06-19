import './Styles.css';

const Start = (props) => {
	return (
		<section className='start-screen'>
			<h1 className='heading'>Quizzical</h1>
			<p className='desc'>Let's get quizzical with the trivia!</p>
			<button className='btn' onClick={props.startQuiz}>
				Start quiz
			</button>
		</section>
	);
};

export default Start;
