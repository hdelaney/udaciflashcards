import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'UdaciFlashcards:decks';
export const QUESTIONS_STORAGE_KEY = 'UdaciFlashcards:questions';


let decks = {
	"vb1kcvta0o6ne6ldkwmkm": {
		deckId: 'vb1kcvta0o6ne6ldkwmkm',
		name: 'State of California Emblems',
		numQuestions: 2,
		correctAnswers: 0
	},
	"4oq2vpoh1bb00iygvpol0ec6": {
		deckId: '4oq2vpoh1bb00iygvpol0ec6',
		name: 'Weather',
		numQuestions: 1,
		correctAnswers: 0
	}
}

let questions = {
	"vb1kcvta0o6ne6ldkwmkm": [{
		deckId: 'vb1kcvta0o6ne6ldkwmkm',
		questionId: 'wwou6740a7bdma2ahd7h8',
		text: "What is the official CA state sport?",
		answer: "surfing"
	}, {
		deckId: 'vb1kcvta0o6ne6ldkwmkm',
		questionId: '0bxwtw6f2vvvfjl856it1k6',
		text: 'What is the the offical CA state mineral and state rock?',
		answer: 'native gold and serpentinite'
	}],
	"4oq2vpoh1bb00iygvpol0ec6": [{
		deckId: '4oq2vpoh1bb00iygvpol0ec6',
		questionId: 'rgwsegrp9pbgompi2arp',
		text: 'A mix of snow and rain precipitation is typically called what?',
		answer: 'sleet'
	}]
}



//udacity/tylermcginnis generate ID code
export function generateAnId () {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}


function setStarterData () {

	AsyncStorage.multiSet([
		[DECKS_STORAGE_KEY, JSON.stringify(decks)],
		[QUESTIONS_STORAGE_KEY, JSON.stringify(questions)]
	]);

	const starter = {
		decks,
		questions
	};
	return starter;
}

export function formatMultiGet (results) {
	let deckData = JSON.parse(results[0][1]);
	let questionsData = JSON.parse(results[1][1]);
	let dataObj = {
		decks: deckData,
		questions: questionsData
	}
	return dataObj
}

export function formatFlashcardResults (results) {
	const data = (results[0][1] === null)
		? setStarterData()
		: formatMultiGet(results);
	return data;
}
