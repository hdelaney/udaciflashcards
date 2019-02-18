import React, { Component } from 'react';
import {
	Text,
	View,
	TextInput,
	ActivityIndicator,
	Button } from 'react-native';
import { Formik } from 'formik';


const AddDeck = ({props}) => (
	<View>
		<Text>Add a Deck</Text>
		<Formik
			initialValues={{ deck: '' }}
			onSubmit={values => console.log(values)}
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
	</View>
)

export default AddDeck;
