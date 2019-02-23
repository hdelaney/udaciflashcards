import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions/decks';
import DeckInfo from './DeckInfo';
import { fetchFlashcardData } from '../utils/api';


class DeckList extends Component {

	componentDidMount () {
		const { dispatch } = this.props;
    fetchFlashcardData()
    	.then((decks) => dispatch(receiveDecks(decks)))
  }


	render() {
		const { decks } = this.props;

		return (
			<View>
				{console.log('THESE ARE THE DEEEECKS:', decks)}
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

function mapStateToProps({ decks }) {
	return {
		decks: Object.entries(decks)
	}
}


export default connect(mapStateToProps)(DeckList);