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
import QRCode from './QRCode'
import Settings from '../../Config/Setting';
import PrintModule from '../../Modules/Print/PrintModule'
const {height, width} = Dimensions.get('window');

export default class Pay extends Component {
  static navigatorStyle = {
    navBarTextColor:"#c49a6c",
    navBarBackgroundColor:"#2f3038",
    navBarButtonColor:"#c49a6c"
  }
  constructor(props)
  {
    super(props);
    this.state = {
        merchantName:props.merchantName,
        merchantAddress:props.merchantAddress,
        merchantPhoneNumber:props.merchantPhoneNumber,
        refId:props.refId,
        time:props.time,
        channel:props.channel,
        rate:props.rate,
        totalAmount:props.totalAmount,
        CNYamount:props.CNYamount,
        display: '',
    };
    this._pressScan = this._pressScan.bind(this);
    this.goBackHome = this.goBackHome.bind(this);
    this._calculateRate = this._calculateRate.bind(this);
    // this._transTime=this._transTime.bind(this);
  }
  componentDidMount() {
    this._pressScan()
    this._convertChannel()
  }
  _convertChannel() {
    if(this.state.channel == "WX") {
      this.setState({
         display: 'Wechat Pay',
      })
    } else if(this.state.channel == "ALI") {
      this.setState({
        display: 'Ali Pay',
     })
    }
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
  _pressScan(){
    let method;
    if(this.state.channel == 'WX'){
      method = "WeChat Pay";
    }else if(this.state.channel == 'ALI'){
      method = "ALIPAY";
    }
    data={
      type:1,
      merchantName:this.state.merchantName,
      merchantAddress:this.state.merchantAddress,
      merchantPhoneNumber:this.state.merchantPhoneNumber,
      refId:this.state.refId,
      date:this.state.time,
      method: method,
      rate:this.state.rate,
      totalAmount:this.state.totalAmount,
      CNYamount:this.state.CNYamount,
      QRCode:this.state.refId,
    }
    PrintModule.printContent(data);
  }
  _calculateRate()
  {
    return (+(this.state.rate)).toFixed(2);
  }

  render() {
    return (
      <View style={styles.container}>
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
              Order Receipt
            </Text>
        </View>
        <View style={{
          backgroundColor:'#F4F4F4',
          flex:0.92,
          alignItems: 'center',
          borderColor:'#D1D3D4',
          borderWidth:1
        }}>
          <View style={{
            backgroundColor:'white',
            borderRadius:8,
            marginTop:Settings.getY(26),
            borderColor:'#D1D3D4',
            width:Settings.getX(484),
            height:Settings.getY(790),
            borderWidth:1
          }}>
            <View style={{
              marginTop:Settings.getY(28),
              marginLeft:Settings.getY(30),
              marginRight:30,
              marginBottom:Settings.getY(7),}}>
              <Text style={{
                marginLeft:0,
                fontSize:24,
                fontWeight: 'bold',
                color:'black',}}>
              {this.state.merchantName}
              </Text>
            </View>
            <View style={{
               marginTop:Settings.getY(20),
               marginLeft:Settings.getX(30),
               borderBottomColor: '#808285',
               borderBottomWidth: 1,
               width: Settings.getX(420),}}>
            </View>
            <View style={{
              marginLeft:Settings.getX(30),
              width:Settings.getX(430),
              height:Settings.getY(182),
            }}>
              <View style = {{
                  marginLeft:0,
                  }}>
                <Text style={{
                  fontSize:18,
                  color:'black',
                  fontWeight:'bold',
                  marginTop:Settings.getX(10)
                }}>
                  Order Number:
                </Text>
                <Text style={{marginLeft:Settings.getX(30),
                  color:'black'}}>
                  {this.state.refId}
                </Text>
              </View>
              <View style = {{
                  marginLeft:0,
                  flexDirection: 'row',
                  marginTop:Settings.getX(6)
                  }}>
                  <Text style={{
                    fontSize:16,
                    color:'black',
                  }}>
                    Time:
                  </Text>
                  <Text style={{marginLeft:Settings.getX(10),
                    color:'black',
                    fontSize:16,
                  }}>
                    {this.state.time}
                  </Text>
              </View>
              <View style = {{
                  marginLeft:0,
                  flexDirection: 'row',
                  marginTop:Settings.getX(6)
                  }}>
                  <Text style={{
                    fontSize:16,
                    color:'black'
                    }}>
                    Channel:
                  </Text>
                  <Text style={{
                    marginLeft:Settings.getX(10),
                    color:'black',
                    fontSize:16,
                  }}>
                    {this.state.display}
                  </Text>
              </View>
            </View>
            <View style={{
               marginTop:Settings.getY(10),
               marginLeft:Settings.getX(30),
               borderBottomColor: '#808285',
               borderBottomWidth: 1,
               width: Settings.getX(420),}}>
            </View>
            <View style={{
              marginTop:Settings.getY(7),
              marginLeft:Settings.getY(30),
              marginRight:30,}}>
              <View style = {{flexDirection: 'row'}}>
                <Text style={{marginLeft:0,
                  fontSize:16,
                  color:'#939598',
                  marginBottom:5}}>
                  Rate:
                </Text>
                <Text style={{
                  marginLeft:Settings.getX(10),
                  color:'#939598',
                  fontSize:16,}}>
                  {this._calculateRate()}
                </Text>
              </View>
              <View style = {{flexDirection: 'row'}}>
                <Text style={{marginLeft:0,
                              fontSize:18,
                              color:'black'
                }}>
                  Total:
                </Text>
                <Text style={{
                  marginLeft:Settings.getX(10),
                  color:'black',
                  fontSize:18,}}>
                ${this.state.totalAmount}
                </Text>
              </View>
            </View>

            <View style={styles.rectangleContainer}>
              <QRCode
                value={this.state.refId}
                size={150}
                bgColor='black'
                fgColor='white'/>
            </View>

            <TouchableOpacity onPress={this._pressScan} activeOpacity={0.4} style={{
              marginLeft:Settings.getX(58),
              marginBottom:Settings.getX(28)
            }}>
              <View style={{
                width:Settings.getX(368),
                height:Settings.getY(85),
                borderRadius:8,backgroundColor:'#2f3038',
                alignItems: 'center',
                justifyContent:'center',flexDirection:'row',
              }}>
                <Image style={{height:Settings.getY(34),
                  width:Settings.getY(34)}}
                  source={require('./image/ScanGold.png')}
                />
                <View style={{width:15}}>
                </View>
                <Text style={{fontSize:24,color:'#c49a6c'}}>
                  PRINT
                </Text>
              </View>
            </TouchableOpacity>
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
