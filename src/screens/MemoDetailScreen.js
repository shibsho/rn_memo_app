import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity, Button } from 'react-native';


class MemoListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memo: {}
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({ memo: params.memo })
  }

  delete_memo(){
    fetch(`http://localhost:8000/api/memos/${this.state.memo.id}`, {
      method: 'DELETE',
    })
    .then(()=>{
      this.props.navigation.goBack();
    })
  }

  render() {
    const { memo } = this.state;
    return (
      <View style={styles.container}>
        <Text>メモ詳細画面</Text>
        <Button
          title="メモリスト画面へ"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Text>ID：{ memo.id }</Text>
        <Text>タイトル：{ memo.title }</Text>
        <Text>テキスト：{ memo.text }</Text>
        <Text>作成日：{ memo.created_at }</Text>
        <Text>更新日：{ memo.updated_at }</Text>
    
        <TouchableOpacity onPress={ this.delete_memo.bind(this) }>
          <Text>メモを削除</Text>
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

export default MemoListScreen;