import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Quiz from './Quiz';

class Deck extends Component {


	startQuiz = () => {
		const {navigation} = this.props;
		const deck = navigation.getParam('deck');
		this.props.navigation.navigate(
			'Quiz',
			{deckId: deck.deckId}
		)
	}

	toAddQuestion = () => {
		const {navigation} = this.props;
		const deck = navigation.getParam('deck');
		navigation.navigate(
			'AddQuestion',
			{deckId: deck.deckId}
		)
	}


	render() {
		const { navigation } = this.props;
		const deck = navigation.getParam('deck');
		console.log(deck);
		return (
			<View style={styles.deckWrapper}>
				<View style={styles.deckTextWrapper}>
					<Text style={styles.deckName}>{deck.name}</Text>
					<Text style={styles.questionText}>{deck.numQuestions} question(s)</Text>
				</View>
				<View style={styles.buttonWrapper}>
					<TouchableOpacity style={styles.button} onPress={this.startQuiz}>
						<Text style={styles.buttonText}>Start Quiz</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={this.toAddQuestion}>
						<Text style={styles.buttonText}>Add a Question</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	deckWrapper: {
		flex: 1,
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
	}
})


function mapStateToProps (decks) {
	return {
		decks
	}
}


export default connect(mapStateToProps)(Deck);
