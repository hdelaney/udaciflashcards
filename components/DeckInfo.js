import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DeckInfo = ({ deck }) => (
	<View key={deck.deckId}>
		<Text style={styles.deckNameText}>{deck.name}</Text>
		<Text style={styles.deckListText}>{deck.numQuestions} question card(s)</Text>
	</View>
)

const styles = StyleSheet.create({
	deckNameText: {
		fontSize: 16
	},
	deckQuestionsText: {
		fontSize: 12
	}
})

export default DeckInfo;
