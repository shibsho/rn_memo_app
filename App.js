import React from 'react';
import {FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memo_title: "",
      memo_text: "",
    };
  }

  componentDidMount() {
    return fetch('http://localhost:8000/api/memos/')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  post_memo(){
    fetch('http://localhost:8000/api/memos/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        owner: 1,
        title: this.state.memo_title,
        text: this.state.memo_text,
      }),
    });
  }

  render() {
    return (
      
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Memo一覧</Text>
        </View>
        <TextInput
          style={{height: 40}}
          placeholder="メモのタイトル"
          onChangeText={(memo_title) => this.setState({memo_title})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="メモのテキスト"
          onChangeText={(memo_text) => this.setState({memo_text})}
        />
        <Text>タイトル：{this.state.memo_title}</Text>
        <Text>テキスト：{this.state.memo_text}</Text>
      
        <TouchableOpacity onPress={this.post_memo.bind(this)}>
          <Text>メモを保存</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.id}{item.title}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 30,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#c6e6fa',
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});