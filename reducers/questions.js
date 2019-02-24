import {
	RECEIVE_QUESTIONS,
	ADD_QUESTION,
	REMOVE_DECK_QUESTIONS
} from '../actions/questions';


export default function questions (state = {}, action) {
	switch (action.type) {
		case RECEIVE_QUESTIONS :
			return {
				...state,
				...action.questions
			}
		case ADD_QUESTION :
			return {
				...state,
				[action.question.deckId]: {
					...state[action.question.deckId].concat(action.question)
				}
			}
		case REMOVE_DECK_QUESTIONS :
			let { [action.question.deckId]: info, ...newState } = state;
			return {
				...newState
			}
		default :
			return state
	}
}