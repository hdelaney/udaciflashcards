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
	Platform } from 'react-native';
import { Formik } from 'formik';
import { submitDeck, submitNewQuestionDeck } from '../utils/api';
import { generateAnId } from '../utils/_DATA';
import { addDeck } from '../actions/decks';
import { addNewQuestionDeck } from '../actions/questions';
import { AsyncStorage } from 'react-native';
import * as Yup from 'yup';


const deckSchema = Yup.object().shape({
	deck: Yup.string()
	.label('Deck')
	.required('A deck name is required')
});


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
					validationSchema={deckSchema}
				>
					{(formikProps) => (
						<View>
							<TextInput
								placeholder='enter flashcard deck name'
								onChangeText={formikProps.handleChange('deck')}
								onBlur={formikProps.handleBlur('deck')}
								value={formikProps.values.deck}
								selectionColor='#5865f8'
								style={styles.formField}
							/>
								<Text style={styles.required}>{formikProps.errors.deck}</Text>
								<TouchableOpacity style={styles.button} onPress={formikProps.handleSubmit}>
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
		backgroundColor: '#efe9f4'
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
  	borderColor: '#5865f8',
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
		borderColor: '#5865f8',
		backgroundColor: Platform.OS === 'ios' ? '#fcfbfd' : '#5863f8'
	},
	buttonText: {
		color: Platform.OS === 'ios' ? '#5863f8' : '#fff',
		fontSize: 18,
		textAlign: 'center'
	},
	required: {
		marginLeft: 10,
		marginBottom: 15,
		color: '#ff33cc',
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

