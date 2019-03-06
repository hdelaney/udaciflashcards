import {
	RECEIVE_DECKS,
	ADD_DECK,
	REMOVE_DECK,
	INCREMENT_CORRECT_ANSWER,
	RESET_CORRECT_ANSWERS,
	INCREMENT_NUMBER_QUESTIONS } from '../actions/actionTypes';


export default function decks (state = {}, action) {
	switch(action.type) {
		case RECEIVE_DECKS : {
			return {
				...state,
				...action.decks
			}
		}
		case ADD_DECK : {
			return {
				...state,
				[action.deck.deckId]: action.deck
			}
		}
		case REMOVE_DECK : {
			let { [action.deck.deckId]: info, ...newState } = state;
			return {
				...newState,
			}
		}
		case INCREMENT_CORRECT_ANSWER : {
			return {
				...state,
				[action.deck.deckId]: {
					...state[action.deck.deckId],
					correctAnswers: state[action.deck.deckId].correctAnswers + 1
				}
			}
		}
		case RESET_CORRECT_ANSWERS : {
			return {
				...state,
				[action.deck.deckId]: {
					...state[action.deck.deckId],
					correctAnswers: 0
				}
			}
		}
		case INCREMENT_NUMBER_QUESTIONS : {
			return {
				...state,
				[action.question.deckId]: {
					...state[action.question.deckId],
					numQuestions: state[action.question.deckId].numQuestions + 1
				}
			}
		}
		default : {
			return state
		}
	}
}