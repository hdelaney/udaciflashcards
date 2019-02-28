import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import Quiz from './Quiz';

class Deck extends Component {


	startQuiz = () => {
		const {navigation} = this.props;
		const deck = navigation.getParam('deck');
		this.props.navigation.navigate(
			'Quiz',
			{deckId: deck[1].deckId}
		)
	}

	toAddQuestion = () => {
		const {navigation} = this.props;
		const deck = navigation.getParam('deck');
		navigation.navigate(
			'AddQuestion',
			{deckId: deck[1].deckId}
		)
	}


	render() {
		const { navigation } = this.props;
		const deck = navigation.getParam('deck');
		console.log(deck);
		return (
			<View>
				<Text>{deck[1].name}</Text>
				<Text>{deck[1].numQuestions} questions</Text>
				<Button onPress={this.startQuiz} title='Start Quiz' />
				<Button onPress={this.toAddQuestion} title='Add a Question' />
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
