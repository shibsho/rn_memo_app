import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity, Button } from 'react-native';


class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  login(){
    fetch('', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
    
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>ログイン</Text>
        <TextInput
          style={{height: 40}}
          placeholder="ユーザー名"
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="パスワード"
          onChangeText={(password) => this.setState({password})}
        />
     
        <TouchableOpacity onPress={this.login.bind(this)}>
          <Text>ログインする</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;