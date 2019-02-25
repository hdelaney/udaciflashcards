import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
// import { QuizCard } from './QuizCard';

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

	handleAnswerPress = () => {
		const { currentQuestion } = this.state;
		const { numberQuestions } = this.props;
		console.log(currentQuestion);
		console.log(numberQuestions);
		if ( currentQuestion + 1 < numberQuestions ) {
			this.incrementCurrentQuestion()
		} else {
			this.finishQuiz()
		}
	}


	render() {
		const { deckId, numberQuestions, questions } = this.props;
		const { currentQuestion, quizOver } = this.state;

		const noQuestionsDisplay = (
			<View>
				<Text>This Deck does not yet have any Quiz questions. Please go back to select another deck</Text>
			</View>
		);

		const quizActiveCard = (
			<View>
				<Text>{questions[deckId][currentQuestion].text}</Text>
				<Text>{questions[deckId][currentQuestion].answer}</Text>
				<Button onPress={this.handleAnswerPress} title='submit'>Submit</Button>
			</View>
		)

		const quizFinishedDisplay = (
			<Text>You finished the quiz</Text>
		)

		return (
			<View>
				{(numberQuestions === null) && noQuestionsDisplay}
				{(numberQuestions !== null && quizOver === false) ? quizActiveCard : quizFinishedDisplay}
			</View>
		)
	}
}

function mapStateToProps (state, { navigation }) {
	const { deckId } = navigation.state.params
	return {
		deckId,
		numberQuestions: (state.questions[deckId]).length ? (state.questions[deckId]).length : null,
		questions: state.questions
	}
}

export default connect(mapStateToProps)(Quiz);



