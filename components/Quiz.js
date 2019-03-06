import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	Button,
	TouchableOpacity,
	StyleSheet,
	Platform } from 'react-native';
import { incrementCorrectAnswer, resetCorrectAnswers } from '../actions/decks';
import { submitResetCorrectAnswers } from '../utils/api';
import { NavigationActions } from 'react-navigation';
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers';
import { purpleBlue, offWhite, grey } from '../utils/colors';
import { FontAwesome } from '@expo/vector-icons';


class Quiz extends Component {
	state = {
		currentQuestion: 0,
		quizOver: false,
		showAnswer: false
	}

	componentWillUnmount () {
		const { deckId, deck, resetAnswers } = this.props;
		//update AsyncStorage
		submitResetCorrectAnswers(deckId);
		//update Redux
		resetAnswers(deck);
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
		const { deck, numberQuestions, handleIncrementAnswer } = this.props;

		//handleIncrementAnswer is a dispatch
		(title === 'correct') && handleIncrementAnswer(deck);

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
		const { deckId, deck, resetAnswers } = this.props;
		//update AsyncStorage
		submitResetCorrectAnswers(deckId);
		//update Redux
		resetAnswers(deck);
		//re-route to Deck view
		this.props.navigation.dispatch(NavigationActions.navigate({
			routeName: 'Deck'
		}))
	}

	startQuizOver = () => {
		const { deckId, deck, resetAnswers } = this.props;
		//update AsyncStorage
		submitResetCorrectAnswers(deckId);
		//update Redux
		resetAnswers(deck);
		//reset component state so quiz can start over
		this.setState({
			quizOver: false,
			currentQuestion: 0
		})
	}

	//https://stackoverflow.com/questions/44423132/get-name-of-button-onpress-in-react-native
	quizActiveCard (questions, deckId, currentQuestion, numberQuestions) {
		return(
			<View>
				<View style={styles.quizTextWrapper}>
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
		let score = Math.floor(correctAnswers / numQuestions * 100);

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
		const { currentQuestion, quizOver } = this.state;

		const noQuestionsDisplay = (
			<View style={styles.noQuiz}>
				<FontAwesome name='question-circle' size={60} color={purpleBlue} />
				<Text style={styles.noQuizText}>This Deck does not have any Quiz questions.</Text>
			</View>
		);


		return (
			<View style={styles.quizWrapper}>
				{numberQuestions === null && noQuestionsDisplay}
				{(numberQuestions !== null && quizOver === false) && (this.quizActiveCard(questions, deckId, currentQuestion, numberQuestions))}
				{quizOver === true && this.quizFinishedDisplay(deck)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	quizWrapper: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: grey
	},
	quizTextWrapper: {
		paddingVertical: 25,
		paddingHorizontal: 25,
		marginVertical: 25,
		borderRadius: Platform.OS === 'ios' ? 4 : 0,
		borderColor: purpleBlue,
		borderWidth: Platform.OS === 'ios' ? 0.5 : 0,
		shadowColor: 'rgb(88, 99, 248)',
		shadowOffset: {
			width: 5,
			height: 5
		},
		shadowRadius: 5,
		shadowOpacity: 1,
		backgroundColor: '#fff'
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
		borderRadius: Platform.OS === 'ios' ? 4 : 0,
		borderWidth: 0.5,
		borderColor: purpleBlue,
		backgroundColor: Platform.OS === 'ios' ? offWhite : purpleBlue
	},
	buttonText: {
		color: Platform.OS === 'ios' ? purpleBlue : '#fff',
		fontSize: 18,
		textAlign: 'center'
	},
	quizQText: {
		marginTop: 10,
		fontSize: 18
	},
	answerButton: {
		color: purpleBlue,
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
	},
	noQuiz: {
		flex: 1,
		alignItems:'center',
		justifyContent: 'center'
	},
	noQuizText: {
		marginTop: 15,
		fontSize: 16
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

function mapDispatchToProps(dispatch) {
	return {
		handleIncrementAnswer: (deck) => dispatch(incrementCorrectAnswer(deck)),
		resetAnswers: (deck) => dispatch(resetCorrectAnswers(deck))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
