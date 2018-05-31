import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity, Button } from 'react-native';


class MemoListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memo: [],
      memo_id:211,
    };
  }

  componentDidMount() {
      
    return fetch(`http://localhost:8000/api/memos/${this.state.memo_id}/`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          memo: [responseJson][0],
        }, function(){
          });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>メモ詳細画面</Text>
        <Button
          title="Go to Lists"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Text>ID：{ this.state.memo.id }</Text>
        <Text>タイトル：{ this.state.memo.title }</Text>
        <Text>テキスト：{ this.state.memo.text }</Text>
        <Text>作成日：{ this.state.memo.created_at }</Text>
        <Text>更新日：{ this.state.memo.updated_at }</Text>
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

export default MemoListScreen;