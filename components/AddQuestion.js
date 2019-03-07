import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
	Text,
	View,
	Button,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Platform } from 'react-native';
import { Formik } from 'formik';
import { addQuestion } from '../actions/questions';
import { incrementNumberQuestions } from '../actions/decks';
import { submitNewQuestion } from '../utils/api';
import { generateAnId } from '../utils/_DATA';
import { purpleBlue, grey, offWhite, pink } from '../utils/colors';


class AddQuestion extends Component {

	backToDeck = (newDeck) => {
		const { navigation } = this.props;
			navigation.navigate(
				'Deck',
				{deck: newDeck}
			)
	}

	addNewQuestion = (values) => {
		const { add, increment, goBack, navigation, decks } = this.props;
		const deckId = navigation.getParam('deckId');
		const id = generateAnId();

		const question = {
			deckId: deckId,
			questionId: id,
			text: values.question.trim(),
			answer: values.answer.trim()
		}

		//update AsyncStorage
		submitNewQuestion(deckId, question);

		//update Redux
		Promise.all([add(question), increment(question)])
			.then((results) => {
				const deck = decks[deckId];
				deck.numQuestions += 1;
				this.backToDeck(deck);
			});

		//TODO: Configure for optimistic results and handle failed submits
	}

	render() {

		//Formik validate is used to display error messages if
		//TouchableOpacity button is pressed with empty fields
		//and also blocks the empty content from submitting
		return (
			<View style={styles.addQuestionWrapper}>
				<Text style={styles.questionHeader}>Add a Question</Text>
				<Formik
					initialValues={{ question: '', answer: '' }}
					onSubmit={(values) => this.addNewQuestion(values)}
					validate={(values) => {
						let errors = {};
						(!values.question) && (errors.question = 'A question description is required.');
						(!values.answer) && (errors.answer = 'An answer response is required.');
						return errors;
					}}
				>
					{(formProps) => (
						<React.Fragment>
							<Text style={styles.marginNudge}>Question</Text>
							<TextInput
								placeholder='enter your question'
								name='question'
								onChangeText={formProps.handleChange('question')}
								onBlur={formProps.handleBlur('question')}
								value={formProps.values.question}
								style={styles.formField}
							/>
							<Text style={styles.required}>{formProps.errors.question}</Text>
							<Text style={styles.marginNudge}>Answer</Text>
							<TextInput
								placeholder='enter the answer'
								name='answer'
								onChangeText={formProps.handleChange('answer')}
								onBlur={formProps.handleBlur('answer')}
								value={formProps.values.answer}
								style={styles.formField}
							/>
							<Text style={styles.required}>{formProps.errors.answer}</Text>
							<TouchableOpacity style={styles.button} onPress={formProps.handleSubmit}>
								<Text style={styles.buttonText}>Submit</Text>
							</TouchableOpacity>
						</React.Fragment>
					)}
				</Formik>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	addQuestionWrapper: {
		flex: 1,
		backgroundColor: grey
	},
	marginNudge: {
		marginLeft: 10
	},
	required: {
		marginLeft: 10,
		marginBottom: 15,
		color: pink,
		fontStyle: 'italic'
	},
	questionHeader: {
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
  	fontSize: 14,
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
	buttonText: {
		color: Platform.OS === 'ios' ? purpleBlue : '#fff',
		fontSize: 18,
		textAlign: 'center'
	}
})



function mapStateToProps ({decks}) {
	return {
		decks
	}
}


function mapDispatchToProps(dispatch, { navigation }) {
	return {
		add: (question) => dispatch(addQuestion(question)),
		increment: (question) => dispatch(incrementNumberQuestions(question))

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);