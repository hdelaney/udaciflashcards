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
import { setLocalNotification } from './utils/helpers';

const store = createStore(combineReducers, middleware);


function CrossPlatStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {

  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <CrossPlatStatusBar backgroundColor={'#5863f8'} barStyle='light-content' />
          <NavContainer />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    flexDirection: 'column',
    backgroundColor: '#efe9f4'
  }
});



