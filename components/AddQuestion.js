import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import { addQuestion } from '../actions/questions';
import { incrementNumberQuestions } from '../actions/decks';
import { submitNewQuestion } from '../utils/api';
import { generateAnId } from '../utils/_DATA';



class AddQuestion extends Component {

	addNewQuestion = (values) => {
		const { dispatch, navigation } = this.props;
		const deckId = navigation.getParam('deckId');
		const id = generateAnId();
		console.log('ID: ', id);

		const question = {
			deckId: deckId,
			questionId: id,
			text: values.question,
			answer: values.answer
		}

		//update Redux
		dispatch(addQuestion(question));
		dispatch(incrementNumberQuestions(question));

		//TODO: update AsyncStorage
		console.log('VALUES:', values)

		//TODO: route back to deck
	}

	render() {
		return (
			<View>
				<Text>Add a Question</Text>
				<Formik
					initialValues={{ question: '', answer: '' }}
					onSubmit={values => this.addNewQuestion(values)}
				>
					{props => (
						<View>
							<Text>Question</Text>
							<TextInput
								onChangeText={props.handleChange('question')}
								onBlur={props.handleBlur('question')}
								value={props.values.question}
							/>
							<Text>Answer</Text>
							<TextInput
								onChangeText={props.handleChange('answer')}
								onBlur={props.handleBlur('answer')}
								value={props.values.answer}
							/>
							<Button onPress={props.handleSubmit} title='Submit' />
						</View>
					)}
				</Formik>
			</View>
		)
	}
}

export default connect()(AddQuestion);