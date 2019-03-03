import React, { Component } from 'react';
import {
	View,
	FlatList,
	Text,
	Button,
	TouchableOpacity,
	StyleSheet,
	Platform } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions/decks';
import { receiveQuestions } from '../actions/questions';
import DeckInfo from './DeckInfo';
import { fetchFlashcardData } from '../utils/api';
import { handleInitializeData } from '../actions/shared';
import { purpleBlue, grey } from '../utils/colors';


class DeckList extends Component {

	componentDidMount () {
		const { handleInitData } = this.props;
    handleInitData();
  }

  renderDeckItem = (renderItem) => {
  	const { item } = renderItem;
  	return (
  		<View key={item.deckId} style={styles.deckListItem}>
				<TouchableOpacity onPress={() => this.props.navigation.navigate(
					'Deck',
					{deck: item}
				)}>
					<DeckInfo deck={item}/>
				</TouchableOpacity>
			</View>
  	)
  }

	render() {
		const { decks } = this.props;
		const length = decks.length;

		return (
			<View style={styles.deckListWrapper}>
				<Text style={styles.deckHeader}>Flashcard Deck List</Text>
				<FlatList
					data={decks}
					renderItem={this.renderDeckItem}
					keyExtractor={deck => deck.deckId}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  deckListWrapper: {
    flex: 1,
    height: 100,
    alignContent: 'center',
    backgroundColor: grey
  },
  deckHeader: {
  	fontSize: 20,
  	paddingVertical: 15,
  	paddingHorizontal: 15,
  	fontWeight: 'bold',
  	backgroundColor: Platform.OS === 'android' ? purpleBlue : '#fff',
  	color: Platform.OS === 'android' ? '#fff' : '#000'
  },
  deckListItem: {
  	flex: 1,
		height:75,
		paddingVertical: 20,
		paddingHorizontal: 15,
		justifyContent: 'space-around',
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderBottomColor: purpleBlue
	},
});


function mapStateToProps({ decks, questions }) {
	return {
		decks: Object.values(decks),
		questions: questions
	}
}

function mapDispatchToProps(dispatch) {
	return {
		handleInitData: () => dispatch(handleInitializeData())
	}
}




export default connect(mapStateToProps, mapDispatchToProps)(DeckList);