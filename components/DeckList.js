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


class DeckList extends Component {

	componentDidMount () {
		const { handleInitData } = this.props;
    handleInitData();
  }

  renderDeckItem = (renderItem) => {
  	console.log('LIST RENDER: ', renderItem);
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
		console.log('DEEECKS TEST LIST DATA: ', decks);
		const length = decks.length;


		return (
			<View style={styles.deckList}>
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
  deckList: {
    flex: 1,
    height: 100,
    alignContent: 'center',
    backgroundColor: '#efe9f4'
  },
  deckHeader: {
  	fontSize: 20,
  	paddingVertical: 15,
  	paddingHorizontal: 15,
  	fontWeight: 'bold',
  	backgroundColor: Platform.OS === 'android' ? '#5863f8' : '#fff',
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
		borderBottomColor: '#5863f8'
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