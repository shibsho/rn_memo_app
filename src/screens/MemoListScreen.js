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


  componentWillMount() {

    const token = this.props.navigation.state.params.token;
    const user_id = this.props.navigation.state.params.user_id;
    this.setState({ user_id: user_id })

    return fetch(`http://localhost:8000/api/users/${user_id}/`,{
      headers:{
        Authorization: `Token ${token}`
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          dataSource: responseJson.memos,
          username: responseJson.username,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }


  render() {
    

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>{ this.state.username }としてログイン中</Text>
        <Text>メモリスト画面</Text>

        <TouchableOpacity onPress={ () => { navigate('MemoCreate', { user_id: this.state.user_id, refresh: this.componentWillMount.bind(this)}) } }>
          <Text>+</Text>
        </TouchableOpacity>
        <FlatList
          data={ this.state.dataSource }
          renderItem={({item}) =>
            <TouchableOpacity onPress={ () => { navigate('MemoDetail', { memo: item, refresh: this.componentWillMount.bind(this) }); }}>
              <Text>{item.title}</Text>
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