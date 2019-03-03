import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Text, View, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { addQuestion } from '../actions/questions';
import { incrementNumberQuestions } from '../actions/decks';
import { submitNewQuestion } from '../utils/api';
import { generateAnId } from '../utils/_DATA';
import * as Yup from 'yup';


const questionSchema = Yup.object().shape({
	question: Yup.string()
	.label('Question')
	.required('A question is required'),
	answer: Yup.string()
	.label('Answer')
	.required('An answer is required')
});


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
		console.log('ID: ', id);

		const question = {
			deckId: deckId,
			questionId: id,
			text: values.question,
			answer: values.answer
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

		return (
			<View style={styles.addQuestionWrapper}>
				<Text style={styles.questionHeader}>Add a Question</Text>
				<Formik
					initialValues={{ question: '', answer: '' }}
					onSubmit={(values) => this.addNewQuestion(values)}
					validationSchema={questionSchema}
				>
					{(formikProps) => (
						<React.Fragment>
							<Text style={styles.marginNudge}>Question</Text>
							<TextInput
								placeholder='enter your question'
								name='question'
								onChangeText={formikProps.handleChange('question')}
								onBlur={formikProps.handleBlur('question')}
								value={formikProps.values.question}
								style={styles.formField}
							/>
							<Text style={styles.required}>{formikProps.errors.question}</Text>
							<Text style={styles.marginNudge}>Answer</Text>
							<TextInput
								placeholder='enter the answer'
								name='answer'
								onChangeText={formikProps.handleChange('answer')}
								onBlur={formikProps.handleBlur('answer')}
								value={formikProps.values.answer}
								style={styles.formField}
							/>
							<Text style={styles.required}>{formikProps.errors.answer}</Text>
							<TouchableOpacity style={styles.button} onPress={formikProps.handleSubmit}>
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
		// alignItems: 'center',
		backgroundColor: '#efe9f4'
	},
	marginNudge: {
		marginLeft: 10
	},
	required: {
		marginLeft: 10,
		marginBottom: 15,
		color: '#ff33cc',
		fontStyle: 'italic'
	},
	questionHeader: {
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