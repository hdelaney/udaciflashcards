import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';


class QuizCard extends Component {


	handleAnswerPress = (incrementCurrentQuestion) => {
		const { currentQuestion } = this.props;
		const currentQInt = parseInt(currentQuestion);
		incrementCurrentQuestion(currentQInt);
	}

	render() {

		const { deckId, currentQuestion, questions, incrementCurrentQuestion } = this.props;
		const currentQInt = parseInt(currentQuestion);

		return(
			<View>
				<Text>{(questions[deckId])[currentQInt].text}</Text>
				<Text>{(questions[deckId])[currentQInt].answer}</Text>
				<Button onPress={this.handleAnswerPress(incrementCurrentQuestion)} title='submit'>Submit</Button>
			</View>
		)
	}
}


function mapStateToProps ({questions}) {
	return {
		questions
	}
}

export default connect(mapStateToProps)(QuizCard);