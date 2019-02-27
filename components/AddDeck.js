import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	View,
	TextInput,
	ActivityIndicator,
	Button } from 'react-native';
import { Formik } from 'formik';
import { submitDeck, submitNewQuestionDeck } from '../utils/api';
import { generateAnId } from '../utils/_DATA';
import { addDeck } from '../actions/decks';
import { addNewQuestionDeck } from '../actions/questions';
import { AsyncStorage } from 'react-native';

// const addDeck = (deckName) => {
// 	//update asyncStorage

// 	//update Redux

// }

class AddDeck extends Component {

	formatDeck = (values, key) => {
		return {
			'deckId': key,
			'name': values.deck,
			'numQuestions': 0,
			'correctAnswers': 0
		}
	}

	toNewDeck = (newDeck) => {
		const { navigation } = this.props;
		navigation.navigate(
			'Deck',
			{deck: newDeck}
		)
	}

	addNewDeck = (values, actions) => {
		const { dispatch, navigation } = this.props;
		let key = generateAnId();
		let deckDetails = this.formatDeck(values, key)
		//update asyncStorage
		submitDeck(key, deckDetails);
		submitNewQuestionDeck(key);

		//update Redux

		Promise.all([
			dispatch(addDeck(deckDetails)),
			dispatch(addNewQuestionDeck(key))
		])
		.then((values) => {
			console.log('VALUES: ', values);
			const deckValue = [];
			const key = values[0].deck.deckId;
			deckValue[0] = key;
			deckValue[1] = values[0].deck;
			this.toNewDeck(deckValue);
		})


		//complete Formik???
		// actions.setSubmitting(false);
	}

	clearAsyncStorage = () => {
		const keys = ['UdaciFlashcards:decks', 'UdaciFlashcards:questions']
		AsyncStorage.multiRemove(keys, (err) => {
			console.log("There's been an error with multiRemove")
		})
		// AsyncStorage.clear();

	}

	render() {
		return (
			<View>
				<Text>Add a Deck</Text>
				<Formik
					initialValues={{ deck: '' }}
					onSubmit={values => this.addNewDeck(values)}
				>
					{props => (
						<View>
							<TextInput
								onChangeText={props.handleChange('deck')}
								onBlur={props.handleBlur('deck')}
								value={props.values.deck}
							/>
							<Button onPress={props.handleSubmit} title='Submit' />
						</View>
					)}
				</Formik>
				<Button onPress={this.clearAsyncStorage} title='clear'>
					<Text>Clear Async Storage</Text>
				</Button>
			</View>
		)
	}
}


// const AddDeck = ({props}) => (

// )

export default connect()(AddDeck);
