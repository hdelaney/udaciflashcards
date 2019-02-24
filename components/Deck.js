import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import Quiz from './Quiz';

class Deck extends Component {

	//TODO: Properly hook up startQuiz to Quiz Card
	startQuiz = () => {
		const deck = this.props.navigation.getParam('deck');
		this.props.navigation.navigate(
			'Quiz',
			{deckId: deck[1].deckId}
		)
		// console.log('heyoooo: ', deck);
	}

	render() {
		const { navigation } = this.props;
		const deck = navigation.getParam('deck');
		return (
			<View>
				<Text>{deck[1].name}</Text>
				<Text>{deck[1].numQuestions} questions</Text>
				<Button onPress={this.startQuiz} title='quiz'>Start Quiz</Button>
			</View>
		)
	}
}


function mapStateToProps (decks) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(Deck);
