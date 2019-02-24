import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions/decks';
import { receiveQuestions } from '../actions/questions';
import DeckInfo from './DeckInfo';
import { fetchFlashcardData } from '../utils/api';
import { handleInitializeData } from '../actions/shared';


class DeckList extends Component {

	componentDidMount () {
		const { dispatch } = this.props;
    // fetchFlashcardData()
    // 	.then((results) => {
    // 		console.log('FETCH RESULTS: ', results);
    // 		// dispatch(receiveDecks(results[0]));
    // 		// dispatch(receiveQuestions(results[1]));

    // 	})
    dispatch(handleInitializeData());
  }


	render() {
		const { decks } = this.props;

		return (
			<View>
				{decks.map((deck) => (
					<View key={deck[0]}>
						<TouchableOpacity onPress={() => this.props.navigation.navigate(
							'Deck',
							{deck: deck}
						)}>
							<DeckInfo deck={deck} />
						</TouchableOpacity>
					</View>
				))}
				<Button onPress={() => console.log('Button pressed!')} title='Submit Get Data' />
			</View>
		)
	}
}

function mapStateToProps({ decks, questions }) {
	return {
		decks: Object.entries(decks),
		questions: questions
	}
}


export default connect(mapStateToProps)(DeckList);