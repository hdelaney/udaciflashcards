import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	View,
	TextInput,
	ActivityIndicator,
	Button } from 'react-native';
import { Formik } from 'formik';
import { submitDeck } from '../utils/api';
import { generateAnId } from '../utils/_DATA';
import { addDeck } from '../actions/decks';
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

	addIt = (values, actions) => {
		let key = generateAnId();
		let deckDetails = this.formatDeck(values, key)
		//update asyncStorage
		submitDeck(deckDetails, key);

		//update Redux
		this.props.dispatch(addDeck({
			[key]: deckDetails
		}));

		//complete Formik
		// actions.setSubmitting(false);
	}

	clearAsyncStorage = async() => {
		AsyncStorage.clear();
	}

	render() {
		return (
			<View>
				<Text>Add a Deck</Text>
				<Formik
					initialValues={{ deck: '' }}
					onSubmit={values => this.addIt(values)}
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
