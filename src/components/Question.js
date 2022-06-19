import './Styles.css';

const Question = () => {
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
