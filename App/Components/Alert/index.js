import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert
} from 'react-native';

export default class MCFAlert extends Component<{}> {
  constructor(){
    super();
    this.state={
      alertTitle:'Alert Title',
      alertMsg: 'My Alert Msg',
      cancelButton: 'Cancel',
      okButton: 'OK'
    }

  }
  componentDidMount(){
    this._openAlert();
  }
  render() {
    return (
      <View style={styles.container}>

       </View>
    );
  }
  _openAlert(){
    Alert.alert(
      this.state.alertTitle,
      this.state.alertMsg,
      [
        {text: this.state.cancelButton, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: this.state.okButton, onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
 },

});
