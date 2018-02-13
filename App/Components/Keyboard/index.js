'use strict'
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,

} from 'react-native';

const {height, width} = Dimensions.get('window');
const deviceWidth = width;
const deviceHeight = height;
import Settings from '../../Config/Setting';
export default class Keyboard extends Component{
    constructor(props){
        super(props)
        this.state={
          text:"",
          width:props.width,
        }
    }
    _renderKeys(){

      let allKeys=[];
      for(var i = 0; i < 9; i++){
        const value = i+1;
        if(i != 2 && i != 5 && i != 8){
          allKeys.push(
            <TouchableHighlight key={i} style={[styles.keyStyle,{borderRightWidth:1}]} underlayColor="#f2f2f2" onPress={()=>{this.props.inputFunc(value)}}>
              <Text style={styles.keyFont}>{i+1}</Text>
            </TouchableHighlight>
          );
        }else{
          allKeys.push(
            <TouchableHighlight key={i} style={styles.keyStyle} underlayColor="#f2f2f2" onPress={()=>{this.props.inputFunc(value)}}>
              <Text style={styles.keyFont}>{i+1}</Text>
            </TouchableHighlight>
          );
        }
        
       
       
      }
      allKeys.push(
        <TouchableHighlight key={9} style={[styles.keyStyle,{borderRightWidth:1,borderBottomWidth:1}]} underlayColor="#f2f2f2" onPress={()=>{this.props.deleteFunc()}}>
          <Text style={styles.keyFont}>C</Text>
        </TouchableHighlight>
      );
      allKeys.push(
        <TouchableHighlight key={10} style={[styles.keyStyle,{borderRightWidth:1,borderBottomWidth:1}]} underlayColor="#f2f2f2" onPress={()=>{this.props.inputFunc(0)}}>
          <Text style={styles.keyFont}>0</Text>
        </TouchableHighlight>
      );
      allKeys.push(
        <View key={11} style={[styles.keyStyle,{borderBottomWidth:1}]} >
        </View>

      );
      return allKeys;
    }
    render(){

        return(
          <View style={[styles.modalContent,this.props.style]}>
              {this._renderKeys()}
          </View>

        )
    }


}

const styles = StyleSheet.create({

  modalContent:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',

  },
  keyStyle:{
    borderTopWidth:1,
    borderColor:'#d9d9d9',
    alignItems:'center',
    justifyContent:'center',
    width:Settings.getX(520)/3,
    height:75,

  },
  keyFont: {
    fontSize:40,

  },

});
