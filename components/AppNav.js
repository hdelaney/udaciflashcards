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
import { orange } from '../utils/colors';


const Tabs = createBottomTabNavigator({
	DeckList: {
		screen: DeckList,
		navigationOptions: {
			tabBarLabel: 'Deck List'
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
			activeTintColor: orange,
			style: {
				height: 56,
				backgroundColor: 'blue',
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
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: 'blue'
			}
		}
	},
	Quiz: {
		screen: Quiz,
		navigationOptions: {
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: 'blue'
			}
		}
	}
})

const NavContainer = createAppContainer(MainNav);

export default NavContainer;



