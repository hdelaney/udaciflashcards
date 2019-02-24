import React from 'react';
import { View, Text } from 'react-native';

export default function DeckInfo({ deck }) {
	return (
		<View key={deck[0].deckId}>
			<Text>{deck[1].name}</Text>
			<Text>{deck[1].numQuestions}</Text>
		</View>
		)
}