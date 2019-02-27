import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { incrementCorrectAnswer, resetCorrectAnswers } from '../actions/decks';
import { submitResetCorrectAnswers } from '../utils/api';
import { NavigationActions } from 'react-navigation';

class Quiz extends Component {
	state = {
		currentQuestion: 0,
		quizOver: false,
		showAnswer: false
	}


	incrementCurrentQuestion = () => {
		this.setState((prevState) => ({
			currentQuestion: (prevState.currentQuestion + 1)
		}))
	}

	finishQuiz = () => {
		this.setState({
			quizOver: true
		})
	}

	handleAnswerPress = (e, title) => {
		const { currentQuestion } = this.state;
		const { deck, numberQuestions, dispatch } = this.props;

		(title === 'correct') && dispatch(incrementCorrectAnswer(deck));

		if ( currentQuestion + 1 < numberQuestions ) {
			this.incrementCurrentQuestion()
		} else {
			this.finishQuiz()
		}
	}

	toggleAnswer = () => {
		this.setState((prevState) => ({
			showAnswer: !prevState.showAnswer
		}))
	}

	toDeckView = () => {
		const { deckId, deck, dispatch } = this.props;
		submitResetCorrectAnswers(deckId);
		dispatch(resetCorrectAnswers(deck));
		this.props.navigation.dispatch(NavigationActions.navigate({
			routeName: 'Deck'
		}))
	}

	startQuizOver = () => {
		const { deckId, deck, dispatch } = this.props;
		submitResetCorrectAnswers(deckId);
		dispatch(resetCorrectAnswers(deck));
		this.setState({
			quizOver: false,
			currentQuestion: 0
		})
	}

	//https://stackoverflow.com/questions/44423132/get-name-of-button-onpress-in-react-native
	quizActiveCard (questions, deckId, currentQuestion, numberQuestions) {
		return(
			<View>
				<Text>Questions remaining after this one: {(numberQuestions-(currentQuestion+1)).toString()}</Text>
				<Text>{questions[deckId][currentQuestion].text}</Text>
				<Button onPress={this.toggleAnswer} title={(this.state.showAnswer) ? 'Hide Answer' : 'Show Answer'} />
				{(this.state.showAnswer) && (<Text>{questions[deckId][currentQuestion].answer}</Text>)}
				<Button onPress={(e) => this.handleAnswerPress(e, 'correct')} title='correct' />
				<Button onPress={(e) => this.handleAnswerPress(e, 'incorrect')} title='incorrect' />
			</View>
		)
	}

	quizFinishedDisplay (deck) {
		const {correctAnswers, numQuestions} = deck
		console.log(correctAnswers);
		let score = Math.floor(correctAnswers / numQuestions * 100);
		console.log(score);
		return (
			<View>
				<Text>You finished the quiz</Text>
				<Text>You scored {score.toString()}% correct.</Text>
				<Button onPress={this.toDeckView} title='Back to Deck' />
				<Button onPress={this.startQuizOver} title='Start Quiz Over' />
			</View>
		)
	}




	render() {
		const { deckId, numberQuestions, questions, deck } = this.props;
		console.log('IN QUIZ: ', numberQuestions);
		const { currentQuestion, quizOver } = this.state;

		const noQuestionsDisplay = (
			<View>
				<Text>This Deck does not yet have any Quiz questions. Please go back to select another deck</Text>
			</View>
		);


		return (
			<View>
				{numberQuestions === null && noQuestionsDisplay}
				{(numberQuestions !== null && quizOver === false) && (this.quizActiveCard(questions, deckId, currentQuestion, numberQuestions))}
				{quizOver === true && this.quizFinishedDisplay(deck)}
			</View>
		)
	}
}

function mapStateToProps (state, { navigation }) {
	const { deckId } = navigation.state.params
	return {
		deckId,
		numberQuestions: (state.questions[deckId]).length ? (state.questions[deckId]).length : null,
		questions: state.questions,
		deck: state.decks[deckId]
	}
}

export default connect(mapStateToProps)(Quiz);
