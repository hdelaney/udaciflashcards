import {
	RECEIVE_QUESTIONS,
	ADD_QUESTION,
	ADD_NEW_QUESTION_DECK,
	REMOVE_DECK_QUESTIONS
} from './actionTypes';


export function receiveQuestions (questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	}
}

export function addQuestion (question) {
	return {
		type: ADD_QUESTION,
		question
	}
}

export function addNewQuestionDeck (deckIdObj) {
	return {
		type: ADD_NEW_QUESTION_DECK,
		deckIdObj
	}
}

export function removeDeckQuestions (question) {
	return {
		type: REMOVE_DECK_QUESTIONS,
		question
	}
}