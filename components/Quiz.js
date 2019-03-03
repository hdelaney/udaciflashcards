import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { incrementCorrectAnswer, resetCorrectAnswers } from '../actions/decks';
import { submitResetCorrectAnswers } from '../utils/api';
import { NavigationActions } from 'react-navigation';
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers';


class Quiz extends Component {
	state = {
		currentQuestion: 0,
		quizOver: false,
		showAnswer: false
	}

	handleLocalNotifcation = () => {
		clearLocalNotifications()
			.then(setLocalNotification)
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
		this.handleLocalNotifcation();
	}

	handleAnswerPress = (e, title) => {
		const { currentQuestion, showAnswer } = this.state;
		const { deck, numberQuestions, dispatch } = this.props;

		(title === 'correct') && dispatch(incrementCorrectAnswer(deck));

		if (currentQuestion + 1 < numberQuestions) {
			this.incrementCurrentQuestion()
		} else {
			this.finishQuiz()
		}
		if (showAnswer === true) {
			this.setState({
				showAnswer: false
			})
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
				<View style={styles.deckTextWrapper}>
					<Text>Questions remaining (after this one): {(numberQuestions-(currentQuestion+1)).toString()}</Text>
					<Text style={styles.quizQText}>{questions[deckId][currentQuestion].text}</Text>
				</View>
				<TouchableOpacity onPress={this.toggleAnswer}>
					<Text style={styles.answerButton}>{(this.state.showAnswer) ? 'Hide Answer' : 'Show Answer'}</Text>
				</TouchableOpacity>
				{(this.state.showAnswer) && (<Text>{questions[deckId][currentQuestion].answer}</Text>)}
				<View style={styles.buttonWrapper}>
					<TouchableOpacity style={styles.button} onPress={(e) => this.handleAnswerPress(e, 'correct')}>
						<Text style={styles.buttonText}>Correct</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={(e) => this.handleAnswerPress(e, 'incorrect')}>
						<Text style={styles.buttonText}>Incorrect</Text>
					</TouchableOpacity>
				</View>
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
				<Text style={styles.finished}>You finished the quiz</Text>
				<Text style={styles.score}>You scored {score.toString()}% correct.</Text>
				<TouchableOpacity style={styles.button} onPress={this.toDeckView}>
					<Text style={styles.buttonText}>Back to Deck</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={this.startQuizOver}>
					<Text style={styles.buttonText}>Start Quiz Over</Text>
				</TouchableOpacity>
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
			<View style={styles.deckWrapper}>
				{numberQuestions === null && noQuestionsDisplay}
				{(numberQuestions !== null && quizOver === false) && (this.quizActiveCard(questions, deckId, currentQuestion, numberQuestions))}
				{quizOver === true && this.quizFinishedDisplay(deck)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	deckWrapper: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#efe9f4'
	},
	deckTextWrapper: {
		paddingVertical: 25,
		paddingHorizontal: 25,
		marginVertical: 25,
		borderRadius: 4,
		borderWidth: 0.5,
		borderColor: '#5fbff9',
		shadowColor: 'rgb(78, 157, 204)',
		shadowOffset: {
			width: 5,
			height: 5
		},
		shadowRadius: 5,
		shadowOpacity: 1,
		backgroundColor: 'white'
	},
	deckName: {
		fontSize: 20
	},
	questionText: {
		fontSize: 16
	},
	buttonWrapper: {
		flex: 1
	},
	button: {
		marginVertical: 15,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 4,
		borderWidth: 0.5,
		borderColor: '#5fbff9',
		backgroundColor: '#fcfbfd'
	},
	buttonText: {
		color: '#5fbff9',
		fontSize: 18,
		textAlign: 'center'
	},
	quizQText: {
		marginTop: 10,
		fontSize: 18
	},
	answerButton: {
		color: '#4e9dcc',
		fontWeight: 'bold'
	},
	finished: {
		paddingVertical: 15,
		fontSize: 26,
		textAlign: 'center'
	},
	score: {
		paddingVertical: 5,
		fontSize: 14,
		textAlign: 'center'
	}
})

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
