import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import NavContainer from './components/AppNav';
import combineReducers from './reducers/index';
import middleware from './middleware';
import { orange } from './utils/colors';

const store = createStore(combineReducers, middleware);


function CrossPlatStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <CrossPlatStatusBar backgroundColor={orange} barStyle='light-content' />
          <NavContainer />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



