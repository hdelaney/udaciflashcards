import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform } from 'react-native';
import Quiz from './Quiz';

export default function Deck(props) {


	startQuiz = () => {
		const {navigation} = props;
		const deck = navigation.getParam('deck');
		props.navigation.navigate(
			'Quiz',
			{deckId: deck.deckId}
		)
	}

	toAddQuestion = () => {
		const {navigation} = props;
		const deck = navigation.getParam('deck');
		navigation.navigate(
			'AddQuestion',
			{deckId: deck.deckId}
		)
	}

	const { navigation } = props;
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
		borderRadius: Platform.OS === 'ios' ? 4 : 0,
		borderColor: '#5865f8',
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
		borderColor: '#5865f8',
		backgroundColor: Platform.OS === 'ios' ? '#fcfbfd' : '#5863f8'
	},
	buttonText: {
		color: Platform.OS === 'ios' ? '#5863f8' : '#fff',
		fontSize: 18,
		textAlign: 'center'
	}
})

