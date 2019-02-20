import {
	_getDecks
} from './_DATA.js';
import { AsyncStorage } from 'react-native';
import { FLASHCARDS_STORAGE_KEY, formatFlashcardResults } from './_DATA';
import { generateAnId } from './_DATA';


export function submitDeck (deck, key) {
	return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
		[key]: deck
	}))
}

export function removeDeck (key) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then((decks) => {
			const data = JSON.parse(results)
			data[key] = undefined
			delete data[key]
			AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
		})
}

export function fetchFlashcardData () {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then((formatFlashcardResults))
}