import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: "",
      error: "",
    };
  }

  login(){
    fetch('http://localhost:8000/obtain-auth-token/', {
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
    .then((response) => {
      responseJson = response.json();
      return responseJson
    })
    .then((responseJson) => {
      if (responseJson.token === undefined){
        this.setState({
          error: "ユーザー名かパスワードが不正です。"
        })
      }else{
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home', params: { token: responseJson.token, user_id: responseJson.id }}),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>ログイン</Text>
        <Text>{ this.state.error }</Text>
        <TextInput
          style={{height: 40}}
          placeholder="ユーザー名"
          onChangeText={(username) => this.setState({username})}
          autoCapitalize="none"
        />
        <TextInput
          style={{height: 40}}
          placeholder="パスワード"
          onChangeText={(password) => this.setState({password})}
          secureTextEntry={true}
          autoCapitalize="none"
        />
     
        <TouchableOpacity onPress={ this.login.bind(this) }>
          <Text>ログインする</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ () => {this.props.navigation.navigate('SignUp')} }>
          <Text>登録画面へ</Text>
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