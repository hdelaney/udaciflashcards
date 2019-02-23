import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';

class Quiz extends Component {
	state = {
		numberQuestions: '',
		currentQuestion: ''
	}

	componentDidMount () {
		const { questions } = this.props;
		( questions.length ) && this.setState({
			numberQuestions: questions.length,
			currentQuestion: 0
		})
	}

	incrementCurrentQuestion = () => {
		let newNumber = (this.state.currentQuestion === null) ? 1 : this.state.currentQuestion + 1;
		this.setState(() => ({
			currentQuestion: newNumber
		}))
	}

	handleAnswerPress = () => {
		const { numberQuestions, currentQuestion } = this.state;
		( currentQuestion + 1 < numberQuestions ) && this.incrementCurrentQuestion
	}

	render() {
		const { numberQuestions, currentQuestion } = this.state;
		const { questions, deckId } = this.props;
		return (
			<View>
				{ ( currentQuestion <= numberQuestions ) ? (
						<View>
							<Text>{questions[deckId][currentQuestion].text}</Text>
							<Text>{questions[deckId][currentQuestion].answer}</Text>
							<Button onPress={this.handleAnswerPress} title='submit'>Submit</Button>
						</View>
					) : (
						<Text>You've finished the quiz</Text>
					) }
			</View>

		)
	}
}

//TODO: Create questions object in state (when data initializes)
function mapStateToProps ({ questions }) {
	return {
		questions
	}
}

export default connect(mapStateToProps)(Quiz);


