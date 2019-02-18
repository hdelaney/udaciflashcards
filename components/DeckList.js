import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { handleInitializeData } from '../actions/shared';
import DeckInfo from './DeckInfo';


class DeckList extends Component {

	componentDidMount () {
    this.props.dispatch(handleInitializeData());
  }

	render() {
		const { decks } = this.props;

		return (
			<View>
				{console.log('THESE ARE THE DEEEECKS:', decks)}
				{decks.map((deck) => (
					<View key={deck[0]}>
						<DeckInfo deck={deck} />
					</View>
				))}
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