import React from 'react';
import { Text, View, Platform } from 'react-native';
import {
		createBottomTabNavigator,
		createStackNavigator,
		createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import AddDeck from './AddDeck';
import DeckList from './DeckList';
import Deck from './Deck';
import Quiz from './Quiz';
import AddQuestion from './AddQuestion';



const Tabs = createBottomTabNavigator({
	DeckList: {
		screen: DeckList,
		navigationOptions: {
			tabBarLabel: 'Deck List',
			tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list-box' size={25} color={tintColor} />
		}
	},
	AddDeck: {
		screen: AddDeck,
		navigationOptions: {
			tabBarLabel: 'Add Deck',
			tabBarIcon: ({ tintColor }) => <Ionicons name='ios-create' size={25} color={tintColor} />
		}
	}
}, {
		navigationOptions: {
			header: null
		},
		tabBarOptions: {
			activeTintColor: '#fff',
			activeBackgroundColor: '#5863f8',
			style: {
				height: 56,
				backgroundColor: '#fff',
				borderColor: '#5863f8',
				shadowColor: 'rgba(88, 99, 248, 0.24)',
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
			headerTintColor: '#5863f8',
			headerStyle: {
				backgroundColor: '#fff',
				borderBottomColor: '#5863f8',
				borderBottomWidth: 2
			}
		}
	},
	Quiz: {
		screen: Quiz,
		navigationOptions: {
			headerTitle: 'Quiz',
			headerTintColor: '#5863f8',
			headerStyle: {
				backgroundColor: '#fff',
				borderBottomColor: '#5863f8',
				borderBottomWidth: 2
			}
		}
	},
	AddQuestion: {
		screen: AddQuestion,
		navigationOptions: {
			headerTitle: 'Add a Question',
			headerTintColor: '#5863f8',
			headerStyle: {
				backgroundColor: '#fff',
				borderBottomColor: '#5863f8',
				borderBottomWidth: 2
			}
		}
	}
})

const NavContainer = createAppContainer(MainNav);

export default NavContainer;



