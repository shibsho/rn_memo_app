import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity, Button } from 'react-native';


class MemoEditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memo: {},
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({ memo: params.memo })
  }

  edit_memo(){
    fetch(`http://localhost:8000/api/memos/${this.state.memo.id}/`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        owner: 1,
        title: this.state.title,
        text: this.state.text,
      }),
    })
    .then(()=>{
      this.props.navigation.goBack();
    })
  }

  render() {
    const { memo } = this.state;
    return (
      <View style={styles.container}>
        <Text>メモ編集画面</Text>
        <Button
          title="メモリスト画面へ"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Text>ID：{ memo.id }</Text>
        <TextInput
          style={{height: 40}}
          value= { memo.title }
          onChangeText={(title) => this.setState({title})}
        />
        <Text>{ memo.title }</Text>
        <Text>{ this.state.title }</Text>
        <TextInput
          style={{height: 40}}
          value= { memo.text }
          onChangeText={(text) => this.setState({text})}
        />
        <Text>{ memo.title }</Text>


        <TouchableOpacity onPress={this.edit_memo.bind(this)}>
          <Text>編集を保存</Text>
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

export default MemoEditScreen;