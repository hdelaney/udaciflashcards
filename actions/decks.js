export const RECEIVE_DECKS ='RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const INCREMENT_CORRECT_ANSWER = 'INCREMENT_CORRECT_ANSWER';
export const RESET_CORRECT_ANSWERS = 'RESET_CORRECT_ANSWERS';


export function receiveDecks (decks) {
	return {
		type: RECEIVE_DECKS,
		decks
	}
}

export function removeDeck (deck) {
	return {
		type: REMOVE_DECK,
		deck
	}
}

export function addDeck (deck) {
	return {
		type: ADD_DECK,
		deck
	}
}

export function incrementCorrectAnswer (deck) {
	return {
		type: INCREMENT_CORRECT_ANSWER,
		deck
	}
}

export function resetCorrectAnswers (deck) {
	return {
		type: RESET_CORRECT_ANSWERS,
		deck
	}
}