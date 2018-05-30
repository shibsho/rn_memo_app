import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { createStackNavigator, } from 'react-navigation';



import MemoListScreen from './src/screens/MemoListScreen';


const App = createStackNavigator({
  Home: { screen: MemoListScreen },
},{
  navigationOptions: {
    headerTitle: 'DRF MEMO APP',
    headerStyle: { backgroundColor: '#265366' },
    headerTitleStyle: { color: '#FFF' },
    headerTintColor: '#483911',
    headerBackTitle: null,
  }
}
);

export default App

