import { AsyncStorage } from 'react-native';
import { FLASHCARDS_STORAGE_KEY, formatFlashcardResults } from './_DATA';


export function fetchFlashcardData () {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then(formatFlashcardResults)
}


export function submitDeck (deck, key) {
	return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY[0], JSON.stringify({
		[key]: deck
	}))
}

export function removeDeck (key) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY[0])
		.then((decks) => {
			const data = JSON.parse(results)
			data[key] = undefined
			delete data[key]
			AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY[0], JSON.stringify(data))
		})
}
