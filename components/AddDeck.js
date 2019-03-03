import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	View,
	TextInput,
	ActivityIndicator,
	Button,
	TouchableOpacity,
	StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { submitDeck, submitNewQuestionDeck } from '../utils/api';
import { generateAnId } from '../utils/_DATA';
import { addDeck } from '../actions/decks';
import { addNewQuestionDeck } from '../actions/questions';
import { AsyncStorage } from 'react-native';


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
			const deckValue = values[0].deck;
			this.toNewDeck(deckValue);
		})

	}

	clearAsyncStorage = () => {
		const keys = ['UdaciFlashcards:decks', 'UdaciFlashcards:questions']
		AsyncStorage.multiRemove(keys, (err) => {
			console.log("There's been an error with multiRemove")
		})
	}

	render() {
		return (
			<View style={styles.addDeckWrapper}>
				<Text style={styles.deckHeader}>Add a Deck</Text>
				<Formik
					initialValues={{ deck: '' }}
					onSubmit={values => this.addNewDeck(values)}
				>
					{props => (
						<View>
							<TextInput
								placeholder='enter flashcard deck name'
								onChangeText={props.handleChange('deck')}
								onBlur={props.handleBlur('deck')}
								value={props.values.deck}
								selectionColor='#5fbff9'
								style={styles.formField}
							/>
								<TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
									<Text style={styles.buttonText}>Submit</Text>
								</TouchableOpacity>
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

const styles = StyleSheet.create({
	addDeckWrapper: {
		flex: 1,
		// alignItems: 'center',
		backgroundColor: '#efe9f4'
	},
	deckHeader: {
  	fontSize: 20,
  	paddingTop: 15,
  	paddingRight: 15,
  	paddingBottom: 15,
  	paddingLeft: 15,
  	fontWeight: 'bold'
  },
  formField: {
  	paddingVertical: 5,
  	paddingHorizontal: 5,
  	marginVertical: 10,
  	marginHorizontal: 10,
  	borderWidth: 0.5,
  	borderColor: '#4e9dcc',
  	borderRadius: 4,
  	backgroundColor: 'white',
  	textAlign: 'left'
  },
	button: {
		alignSelf: 'center',
		marginVertical: 15,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 4,
		borderWidth: 0.5,
		borderColor: '#5fbff9',
		backgroundColor: '#fcfbfd'
	},
	buttonText: {
		color: '#5fbff9',
		fontSize: 18,
		textAlign: 'center'
	}
})


export default connect()(AddDeck);
