import { initializeData } from '../utils/api';
import { receiveDecks } from './decks';


export function handleInitializeData () {
	return (dispatch) => {
		return initializeData()
			.then(({ decks }) => {
				dispatch(receiveDecks(decks));
			})
	}
}