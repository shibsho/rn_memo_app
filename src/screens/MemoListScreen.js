import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity, Button } from 'react-native';


class MemoListScreen extends React.Component {
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
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>メモリスト画面</Text>
        <TouchableOpacity onPress={ () => { navigate('MemoCreate') } }>
          <Text>+</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) =>
            <TouchableOpacity onPress={ () => { navigate('MemoDetail', { memo: item}); }}>
              <Text>{item.id}{item.title}</Text>
            </TouchableOpacity>
          }
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
});

export default MemoListScreen;