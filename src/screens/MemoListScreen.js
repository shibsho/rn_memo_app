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


  render() {
    

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <Text>メモリスト画面</Text>

        <TouchableOpacity onPress={ () => { navigate('MemoCreate', { refresh: this.componentWillMount.bind(this)}) } }>
          <Text>+</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) =>
            <TouchableOpacity onPress={ () => { navigate('MemoDetail', { memo: item, refresh: this.componentWillMount.bind(this) }); }}>
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