import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity, Button } from 'react-native';


class MemoCreateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memo_title: "",
      memo_text: "",
    };
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
    })
    .then(()=>{
      this.props.navigation.navigate('Home')
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>メモ作成画面</Text>
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
     
        <TouchableOpacity onPress={ this.post_memo.bind(this) }>
          <Text>メモを保存</Text>
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

export default MemoCreateScreen;