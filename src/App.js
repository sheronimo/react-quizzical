import { useState } from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';

function App() {
	const [quiz, setQuiz] = useState(false);

	function startQuiz() {
		setQuiz(true);
	}

	return (
		<main className='main'>
			{quiz ? <Quiz /> : <Start startQuiz={startQuiz} />}
		</main>
	);
}

export default App;
