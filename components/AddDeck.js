import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	View,
	TextInput,
	ActivityIndicator,
	Button,
	TouchableOpacity,
	StyleSheet,
	Platform,
	AsyncStorage } from 'react-native';
import { Formik } from 'formik';
import { submitDeck, submitNewQuestionDeck } from '../utils/api';
import { generateAnId } from '../utils/_DATA';
import { addDeck } from '../actions/decks';
import { addNewQuestionDeck } from '../actions/questions';
import { purpleBlue, grey, offWhite, pink } from '../utils/colors';


class AddDeck extends Component {

	formatDeck = (values, key) => {
		return {
			'deckId': key,
			'name': values.deck.trim(),
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
		const { navigation, handleAddDeck, handleAddNewQuestionDeck } = this.props;
		let key = generateAnId();
		let deckDetails = this.formatDeck(values, key)

		//update asyncStorage
		submitDeck(key, deckDetails);
		submitNewQuestionDeck(key);

		//update Redux
		Promise.all([
			handleAddDeck(deckDetails),
			handleAddNewQuestionDeck(key)
		])
		.then((values) => {
			const deckValue = values[0].deck;
			this.toNewDeck(deckValue);
		})

	}

	//Formik validate in combo with disabled prop on TouchableOpacity
	//is used to disable the TouchableOpacity button entirely
	render() {
		return (
			<View style={styles.addDeckWrapper}>
				<Text style={styles.deckHeader}>Add a Deck</Text>
				<Formik
					initialValues={{ deck: '' }}
					onSubmit={(values) => this.addNewDeck(values)}
					validate={(values) => {
						let errors = [];
						(!values.deck) && (errors.deck = 'A deck name is required.');
						return errors;
					}}>
					{(formProps) => (
						<View>
							<TextInput
								placeholder='enter flashcard deck name'
								onChangeText={formProps.handleChange('deck')}
								onBlur={formProps.handleBlur('deck')}
								value={formProps.values.deck}
								selectionColor={purpleBlue}
								style={styles.formField}
							/>
							<TouchableOpacity
								style={(formProps.isSubmitting || !formProps.values.deck) ? (
									styles.disabledButton
									) : (
									styles.button
								)}
								onPress={formProps.handleSubmit}
								disabled={formProps.isSubmitting || !formProps.values.deck}
							>
								<Text style={(formProps.isSubmitting || !formProps.values.deck) ? (
									styles.disabledButtonText
									) : (
									styles.buttonText
								)}>Submit</Text>
							</TouchableOpacity>
						</View>
					)}
					</Formik>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	addDeckWrapper: {
		flex: 1,
		backgroundColor: grey
	},
	deckHeader: {
  	fontSize: 20,
  	paddingVertical: 15,
  	paddingHorizontal: 15,
  	fontWeight: 'bold'
  },
  formField: {
  	paddingVertical: 10,
  	paddingHorizontal: 5,
  	marginVertical: 10,
  	marginHorizontal: 10,
  	borderColor: purpleBlue,
  	borderWidth: Platform.OS === 'ios' ? 0.5 : 0,
  	borderRadius: 4,
  	backgroundColor: '#fff',
  	textAlign: 'left'
  },
	button: {
		alignSelf: 'center',
		marginVertical: 15,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: Platform.OS === 'ios' ? 4 : 0,
		borderWidth: 0.5,
		borderColor: purpleBlue,
		backgroundColor: Platform.OS === 'ios' ? offWhite : purpleBlue
	},
	disabledButton: {
		alignSelf: 'center',
		marginVertical: 15,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: Platform.OS === 'ios' ? 4 : 0,
		borderWidth: 0.5,
		borderColor: '#b9bac6',
		backgroundColor: '#e3e3e8'
	},
	buttonText: {
		color: Platform.OS === 'ios' ? purpleBlue : '#fff',
		fontSize: 18,
		textAlign: 'center'
	},
	disabledButtonText: {
		color: '#b9bac6',
		fontSize: 18,
		textAlign: 'center'
	},
	required: {
		marginLeft: 10,
		marginBottom: 15,
		color: pink,
		fontStyle: 'italic'
	}
})

function mapDispatchToProps(dispatch) {
	return {
		handleAddDeck: (deckDetails) => dispatch(addDeck(deckDetails)),
		handleAddNewQuestionDeck: (key) => dispatch(addNewQuestionDeck(key))
	}
}

export default connect(null, mapDispatchToProps)(AddDeck);

