import React from 'react';
import { Text, View, Platform } from 'react-native';
import {
		createBottomTabNavigator,
		createStackNavigator,
		createDrawerNavigator,
		createAppContainer } from 'react-navigation';
import AddDeck from './AddDeck';
import DeckList from './DeckList';
import Deck from './Deck';
import Quiz from './Quiz';
import AddQuestion from './AddQuestion';
import { orange } from '../utils/colors';


const Tabs = createBottomTabNavigator({
	DeckList: {
		screen: DeckList,
		navigationOptions: {
			tabBarLabel: 'Deck List',
		}
	},
	AddDeck: {
		screen: AddDeck,
		navigationOptions: {
			tabBarLabel: 'Add Deck'
		}
	}
}, {
		navigationOptions: {
			header: null
		},
		tabBarOptions: {
			activeTintColor: 'white',
			style: {
				height: 56,
				backgroundColor: '#4e9dcc',
				shadowColor: 'rgba(0, 0, 0, 0.24)',
				shadowOffset: {
					width: 0,
					height: 3
				},
				shadowRadius: 6,
				shadowOpacity: 1
			}
		}
	});

const MainNav = createStackNavigator({
	Home: {
		screen: Tabs
	},
	Deck: {
		screen: Deck,
		navigationOptions: {
			headerTitle: 'Flashcard Deck',
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#4e9dcc'
			}
		}
	},
	Quiz: {
		screen: Quiz,
		navigationOptions: {
			headerTitle: 'Quiz',
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#4e9dcc'
			}
		}
	},
	AddQuestion: {
		screen: AddQuestion,
		navigationOptions: {
			headerTitle: 'Add a Question',
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#4e9dcc'
			}
		}
	}
})

const NavContainer = createAppContainer(MainNav);

export default NavContainer;



