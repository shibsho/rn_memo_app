import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { createStackNavigator, } from 'react-navigation';



import MemoListScreen from './src/screens/MemoListScreen';

export default App = createStackNavigator({
  Home: { screen: MemoListScreen },
});

