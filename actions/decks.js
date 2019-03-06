import {
	RECEIVE_DECKS,
	ADD_DECK,
	REMOVE_DECK,
	INCREMENT_CORRECT_ANSWER,
	RESET_CORRECT_ANSWERS,
	INCREMENT_NUMBER_QUESTIONS
} from './actionTypes';


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

export function incrementNumberQuestions (question) {
	return {
		type: INCREMENT_NUMBER_QUESTIONS,
		question
	}
}