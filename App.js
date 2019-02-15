import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import DeckList from './components/DeckList';
import combineReducers from './reducers/index';
import middleware from './middleware';

const store = createStore(combineReducers, middleware);

class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <DeckList key='decklist' />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;


