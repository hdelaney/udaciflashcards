export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_NEW_QUESTION_DECK = 'ADD_NEW_QUESTION_DECK';
export const REMOVE_DECK_QUESTIONS = 'REMOVE_DECK_QUESTIONS';


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