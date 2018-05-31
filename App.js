import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { createStackNavigator, } from 'react-navigation';

import MemoListScreen from './src/screens/MemoListScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';


const App = createStackNavigator({
  Home: { screen: MemoListScreen },
  MemoDetail: { screen: MemoDetailScreen },
},{
  navigationOptions: {
    headerTitle: 'DRF MEMO APP',
    headerStyle: { backgroundColor: '#265366' },
    headerTitleStyle: { color: '#FFF' },
    headerTintColor: '#AAA',
    headerBackTitle: null,
  }
}
);

export default App

