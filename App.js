import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput, Button, FlatList} from 'react-native';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCkUpY68pDPGznsb32J8XNrkCTaXnNt0H8",
  authDomain: "message-board-fb760.firebaseapp.com",
  databaseURL: "https://message-board-fb760.firebaseio.com",
  projectId: "message-board-fb760",
  storageBucket: "message-board-fb760.appspot.com",
  messagingSenderId: "461070418084",
  appId: "1:461070418084:web:68ab654f6f2771ef"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  constructor(props){ 
    super(props)

    this.state={
      message: '',
      message:[]
    }
    this.addItem = this.addItem.bind(this);
  }
  
  componentDidMount(){
    firebase
    .database()
    .ref()
    .child("messages")
    .once("value", snapshot => {
      const data = snapshot.val();
      if (snapshot.val()){
        const initMessages = [];
        Object
        .keys(data)
        .forEach(message => initMessages.push(data[message]));
        this.setState({
          messages: initMessages
        })
      }
    });

    firebase
    .database()
    .ref()
    .child("messages")
    .on("child_added", snapshot => { 
      const data = snapshot.val();   
      if(data) {
        this.setState(prevState => ({
          messages: [data, ...prevState.messages]
        }))
      }
    })
  }



  addItem(){

  }
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.msgBox}>
        <TextInput placeholder = 'Enter Your Message'
        onChangeText = {(text)=> this.setState({message: text})}
        style = {styles.txtInput}/>
        <Button title='Send' onPress={this.addItem}/>
      </View>
      <FlatList data={this.state.message}
      renderItem={({item})=> 
      <View  style={styles.listItemContainer}>
        <Text style = {styles.listItem}>
        {item}
        </Text>
      </View>
      }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#eee',
    marginTop: 5,
  },
  msgBox:{
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
  },
  txtInput:{
    flex:1,
  },
  listItemContainer:{
    backgroundColor:'#fff',
    margin:5,
    borderRadius: 5,
  },
  listItem:{
    fontSize: 20,
    padding:10, 
  },
});
