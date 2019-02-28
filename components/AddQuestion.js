import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Text, View, Button, TextInput } from 'react-native';
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
				const deckValue = [deckId, deck];
				this.backToDeck(deckValue);
			});

		//TODO: Configure for optimistic results and handle failed submits
	}

	render() {

		return (
			<View>
				<Text>Add a Question</Text>
				<Formik
					initialValues={{ question: '', answer: '' }}
					onSubmit={(values) => this.addNewQuestion(values)}
					validationSchema={questionSchema}
				>
					{(formikProps) => (
						<React.Fragment>
							<Text>Question</Text>
							<TextInput
								placeholder='enter your question'
								name='question'
								onChangeText={formikProps.handleChange('question')}
								onBlur={formikProps.handleBlur('question')}
								value={formikProps.values.question}
							/>
							<Text style={{color: 'red'}}>{formikProps.errors.question}</Text>
							<Text>Answer</Text>
							<TextInput
								placeholder='enter the answer'
								name='answer'
								onChangeText={formikProps.handleChange('answer')}
								onBlur={formikProps.handleBlur('answer')}
								value={formikProps.values.answer}
							/>
							<Text style={{color: 'red'}}>{formikProps.errors.answer}</Text>
							<Button onPress={formikProps.handleSubmit} title='Submit' />
						</React.Fragment>
					)}
				</Formik>
			</View>
		)
	}
}

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