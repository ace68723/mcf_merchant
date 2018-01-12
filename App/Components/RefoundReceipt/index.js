/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions
} from 'react-native';
import Settings from '../../Config/Setting';
import PrintModule from '../../Modules/Print/PrintModule'
import Loading from '../Loading';
const {height, width} = Dimensions.get('window');

export default class Pay extends Component {
  // static navigatorStyle = {
  //   navBarTextColor:"#c49a6c",
  //   navBarBackgroundColor:"#2f3038",
  //   navBarButtonColor:"#c49a6c"
  // }
  constructor(props)
  {
    super(props);
    this.state = {
      name:props.name,
      refId:props.refId,
      time:props.time,
      channel:props.channel,
      rate:props.rate,
      repeat: props.repeat,
      totalAmount:props.totalAmount,
        };
      this._pressScan=this._pressScan.bind(this);
      this.goBackHome = this.goBackHome.bind(this);
  }
  
  _pressScan(){
    console.log(this.state);
    let method;
    if(this.state.channel == 'WX'){
      method = "WeChat Pay";
    }else if(this.state.channel == 'ALI'){
      method = "ALIPAY";
    }
    data={
      type:3,
      merchantName:this.state.name,

      refId:this.state.refId,

      totalAmount:this.state.totalAmount,
      date:this.state.time,

    }
    PrintModule.printContent(data);
  }
  goBackHome() {
    this.props.navigator.resetTo({
      screen: 'Home',
      title: 'Home',
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: {},
      animationType: 'slide-horizontal'
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Loading ref="loading" size={60}/>
        <View style={{
          backgroundColor:'#2f3038',
          flex:0.08,
          alignItems: 'center',
          flexDirection: 'row'
        }}>
            <TouchableOpacity onPress={this.goBackHome}
            style={{
              position:'absolute',
              alignItems:'center',
              justifyContent: 'center',
              height: '100%',
              left:0.05*width}}>
                  <Image style = {{height:Settings.getY(34),
              width:Settings.getY(24)}}
                      source={require('./image/back.png')}
                    />
            </TouchableOpacity>
            <Text style={{
                  fontSize:20,
                  color:'#c49a6c',
                  position:'absolute',
                  left:0.34*width}}>
              Refund Receipt
            </Text>
        </View>
        <View style={{
          backgroundColor:'#F4F4F4',
          flex:0.92,
          alignItems: 'center',
          borderColor:'#D1D3D4',
          borderWidth:1,
        }}>
          <View style={{
            backgroundColor:'white',
             borderRadius:8,
             marginTop:Settings.getY(26),
             borderColor:'#D1D3D4',
             width:Settings.getX(484),
             height:Settings.getY(500),
             borderWidth:1
           }}>
            <View style={{
              marginTop:Settings.getY(28),
              marginLeft:Settings.getY(30),
              marginRight:30,
              marginBottom:Settings.getY(7),
            }}>
              <Text style={{
                marginLeft:0,
                fontSize:18,
                fontWeight: 'bold',
                color:'black',
              }}>
              {this.state.name}
              </Text>
              <View style = {{
                  marginLeft:0,

                }}>
                <Text style={{
                  fontSize:18,
                  color:'black',
                  fontWeight: 'bold',
                  marginTop:Settings.getX(10)
                }}>
                  Order Number:
                </Text>
                  <Text style={{marginLeft:Settings.getX(10),color:'black'}}>
                    {this.state.refId}
                  </Text>
              </View>

            </View>

            <View style={{
               marginTop:Settings.getY(25),
               marginLeft:Settings.getX(30),
               borderBottomColor: '#808285',
               borderBottomWidth: 1,

               width: Settings.getX(420),}}>
            </View>
            <View style={{
              marginTop:Settings.getY(28),
              marginLeft:Settings.getY(30),
              marginRight:30,}}>

              <Text style={{
                marginLeft:0,
                fontSize:26,
                color:'black',
              }}>
                Total:${this.state.totalAmount}
              </Text>

            </View>

            <TouchableOpacity activeOpacity={0.4} onPress={this._pressScan} style={{
              marginLeft:Settings.getX(58),
              marginBottom:Settings.getX(28),
              marginTop:Settings.getX(48),
            }}>
              <View style={{
                width:Settings.getX(368),
                height:Settings.getY(85),borderRadius:8,backgroundColor:'#2f3038',
                alignItems: 'center',
                justifyContent:'center',flexDirection:'row',
              }}>

                <View style={{width:15}}>
                </View>
                <Text style={{fontSize:24,color:'#c49a6c'}}>
                  PRINT
                </Text>
              </View>

            </TouchableOpacity>
            <View style={{
              marginTop:Settings.getY(15),
              marginLeft:Settings.getY(30),
              marginRight:30,
              marginBottom:Settings.getY(7),
            }}>
              <Text style={{
                marginLeft:0,
                fontSize:18,
                fontWeight: 'bold',
                color:'#c49a6c',
              }}>
                Successfully Returned.
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
});
