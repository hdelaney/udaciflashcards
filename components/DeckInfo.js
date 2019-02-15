import React from 'react';
import { View, Text } from 'react-native';

export default function DeckInfo({ deck }) {
	console.log('Is this deck.deckId?: ', deck.deckId);
	return (
		<View key={deck[0].deckId}>
			<Text>{deck[1].name}</Text>
			<Text>{deck[1].numQuestions}</Text>
		</View>
		)
}