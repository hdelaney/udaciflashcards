import { fetchFlashcardData } from '../utils/api';
import { receiveDecks } from './decks';
import { receiveQuestions } from './questions';


export function handleInitializeData () {
	return (dispatch) => {
		return fetchFlashcardData()
			.then(({decks, questions}) => {
				dispatch(receiveDecks(decks));
				dispatch(receiveQuestions(questions));
			})
	}
}