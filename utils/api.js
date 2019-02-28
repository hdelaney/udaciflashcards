import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY, QUESTIONS_STORAGE_KEY, formatFlashcardResults, formatMultiGet } from './_DATA';


export function fetchFlashcardData () {
	return AsyncStorage.multiGet([DECKS_STORAGE_KEY, QUESTIONS_STORAGE_KEY])
		.then(formatFlashcardResults)
}


export function submitDeck (key, deck) {
	const data = {};
	data[key] = deck;
	console.log('TRYING TO SUBMIT: ', data);
	return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(data));
}

export function removeDeck (key) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((decks) => {
			const data = JSON.parse(results);
			data[key] = undefined;
			delete data[key];
			AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
		})
}

export function submitNewQuestionDeck (key) {
	return AsyncStorage.mergeItem(QUESTIONS_STORAGE_KEY, JSON.stringify({
		[key]: []
	}))
}

export function submitCorrectAnswer (key) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((result) => {
			const data = JSON.parse(results);
			data[key].correctAnswers += 1;
			AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
		})
}


export function submitResetCorrectAnswers (key) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((result) => {
			const data = JSON.parse(result);
			data[key].correctAnswers = 0;
			AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
		})
}

export function submitNewQuestion (key, question) {
	return AsyncStorage.multiGet([DECKS_STORAGE_KEY, QUESTIONS_STORAGE_KEY])
		.then((result) => {
			const formattedData = formatMultiGet(result);
			const {decks, questions} = formattedData;
			decks[key].numQuestions += 1;
			questions[key].push(question);
			AsyncStorage.multiSet([[
				DECKS_STORAGE_KEY, JSON.stringify(decks)
				], [
				QUESTIONS_STORAGE_KEY, JSON.stringify(questions)
			]])
			// console.log('FORMATTED ADD QUESTION RESULTS: ', formattedData);
		})
}
