import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';

class Quiz extends Component {
	state = {
		currentQuestion: 0
	}

	// componentDidMount () {
	// 	const { questions, deckId } = this.props;
	// 	( (questions[deckId]).length ) && this.setState({
	// 		currentQuestion: 0
	// 	})
	// }

	incrementCurrentQuestion = () => {
		this.setState((prevState) => ({
			currentQuestion: (prevState.currentQuestion + 1)
		}))
	}

	handleAnswerPress = () => {
		const { currentQuestion } = this.state;
		const { numberQuestions } = this.props;
		console.log(currentQuestion);
		console.log(numberQuestions);
		if ( currentQuestion < numberQuestions ) {
			this.incrementCurrentQuestion()
		}

	}

	render() {
		const { currentQuestion } = this.state;
		const { questions, deckId, numberQuestions } = this.props;
		return (
			<View>
				{ ( currentQuestion + 1 <= numberQuestions ) ? (
						<View>
							<Text>{(questions[deckId])[currentQuestion].text}</Text>
							<Text>{(questions[deckId])[currentQuestion].answer}</Text>
							<Button onPress={this.handleAnswerPress} title='submit'>Submit</Button>
						</View>
					) : (
						<Text>You've finished the quiz</Text>
					) }
			</View>

		)
	}
}

function mapStateToProps (state, { navigation }) {
	const { deckId } = navigation.state.params
	return {
		deckId,
		numberQuestions: (state.questions[deckId]).length,
		questions: state.questions
	}
}

export default connect(mapStateToProps)(Quiz);


