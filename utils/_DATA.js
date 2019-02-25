import { AsyncStorage } from 'react-native';


export const DECKS_STORAGE_KEY = 'UdaciFlashcards:decks';
export const QUESTIONS_STORAGE_KEY = 'UdaciFlashcards:questions';


let decks = {
	"vb1kcvta0o6ne6ldkwmkm": {
		deckId: 'vb1kcvta0o6ne6ldkwmkm',
		name: 'Bar Night Trivia',
		numQuestions: 2,
		correctAnswers: 0
	},
	"4oq2vpoh1bb00iygvpol0ec6": {
		deckId: '4oq2vpoh1bb00iygvpol0ec6',
		name: 'Random Animal Facts',
		numQuestions: 1,
		correctAnswers: 0
	}
}

//first key is the deckId, then array of questions for each deck
let questions = {
	"vb1kcvta0o6ne6ldkwmkm": [{
		deckId: 'vb1kcvta0o6ne6ldkwmkm',
		questionId: 'wwou6740a7bdma2ahd7h8',
		text: "What ice cream flavor was created in Berkeley and named after the area's bumpy streets?",
		answer: "Rocky Road"
	}, {
		deckId: 'vb1kcvta0o6ne6ldkwmkm',
		questionId: '0bxwtw6f2vvvfjl856it1k6',
		text: 'What holiday is celebrated around the new moon in January or February each year?',
		answer: 'Chinese Lunar New Year'
	}],
	"4oq2vpoh1bb00iygvpol0ec6": [{
		deckId: '4oq2vpoh1bb00iygvpol0ec6',
		questionId: 'rgwsegrp9pbgompi2arp',
		text: 'What is the state bird of California?',
		answer: 'California Quail'
	}]
}



//udacity/tylermcginnis generate ID code
export function generateAnId () {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}


function _getDecks () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...decks}), 1000)
  })
}

function _getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000)
  })
}

function setStarterData () {
	// const decks = _getDecks();
	// const questions = _getQuestions();

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

function formatMultiGet (results) {
	console.log('MULTIGET RESULTS: ', results);
	// let parsedData = JSON.parse(results);
	// console.log('MULTIGET PARSED???: ', parsedData);
	let deckData = JSON.parse(results[0][1]);
	let questionsData = JSON.parse(results[1][1]);
	let dataObj = {
		decks: deckData,
		questions: questionsData
	}
	return dataObj
}

export function formatFlashcardResults (results) {
	console.log('FORMAT RESULTS 0 1: ', results[0][1]);
	const data = (results[0][1] === null)
		? setStarterData()
		: formatMultiGet(results);
	console.log('DATA: ', data);
	return data;
}
