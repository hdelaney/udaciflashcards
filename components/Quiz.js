import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { incrementCorrectAnswer, resetCorrectAnswers } from '../actions/decks';
import { submitResetCorrectAnswers } from '../utils/api';
import { NavigationActions } from 'react-navigation';

class Quiz extends Component {
	state = {
		currentQuestion: 0,
		quizOver: false
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
		dispatch(incrementCorrectAnswer(deck));
		if ( currentQuestion + 1 < numberQuestions ) {
			this.incrementCurrentQuestion()
		} else {
			this.finishQuiz()
		}
	}

	toDeckList = () => {
		const { deckId, deck, dispatch } = this.props;
		submitResetCorrectAnswers(deckId);
		dispatch(resetCorrectAnswers(deck));
		this.props.navigation.dispatch(NavigationActions.navigate({
			routeName: 'DeckList'
		}))
	}

	//https://stackoverflow.com/questions/44423132/get-name-of-button-onpress-in-react-native
	quizActiveCard (questions, deckId, currentQuestion) {
		return(
			<View>
				<Text>{questions[deckId][currentQuestion].text}</Text>
				<Text>{questions[deckId][currentQuestion].answer}</Text>
				<Button onPress={(e) => this.handleAnswerPress(e, 'correct')} title='correct'>Correct</Button>
				<Button onPress={(e) => this.handleAnswerPress(e, 'incorrect')} title='incorrect'>Incorrect</Button>
			</View>
		)
	}




	render() {
		const { deckId, numberQuestions, questions } = this.props;
		console.log('IN QUIZ: ', numberQuestions);
		const { currentQuestion, quizOver } = this.state;

		const noQuestionsDisplay = (
			<View>
				<Text>This Deck does not yet have any Quiz questions. Please go back to select another deck</Text>
			</View>
		);



		const quizFinishedDisplay = (
			<View>
				<Text>You finished the quiz</Text>
				<Button onPress={this.toDeckList} title='Back to Deck List' />
			</View>
		)

		return (
			<View>
				{numberQuestions === null && noQuestionsDisplay}
				{(numberQuestions !== null && quizOver === false) && (this.quizActiveCard(questions, deckId, currentQuestion))}
				{quizOver === true && quizFinishedDisplay}

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
