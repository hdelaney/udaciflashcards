import {
	_getDecks
} from './_DATA.js';


export function initializeData() {
	return new Promise((res, rej) => {
		res(_getDecks())
	}).then((decks) => ({
			decks
		}))
}