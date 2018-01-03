/* @flow */

import React, { Component } from 'react';
import {
  Keyboard,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert
} from 'react-native';
import QRCode from './QRCode';
import TimerMixin from 'react-timer-mixin';
import ScanQRCodeModule from '../../Module/ScanQRCode/ScanQRCodeModule';
import Loading from '../Loading';
import Settings from '../../Config/Setting';
import PayModule from '../../Module/Pay/PayModule';
export default class Pay extends Component {
  mixins: [TimerMixin]
  static navigatorStyle = {
    navBarTextColor:"#c49a6c",
    navBarBackgroundColor:"#2f3038",
    navBarButtonColor:"#c49a6c"
  }
  constructor(props)
  {
    super(props);
    this.state = {
      codeUrl:props.codeUrl,
      totalAmount: props.totalAmount,
      channel: props.channel,
      outTradeNo: props.out_trade_no,
    };
    this._goToScanQRCode = this._goToScanQRCode.bind(this);
  }
  componentDidMount() {
    this._checkOrderStatus()
  }
  async _goToScanQRCode() {
    this.refs.loading.startLoading();
    const {channel,title} =  this.props;
    let totalAmount = this.state.totalAmount;
    console.log(totalAmount);
    totalAmount = parseInt(totalAmount*100, 10);
    totalAmount = totalAmount/100;
    try{
      console.log(totalAmount);
      const data = await PayModule.preCreateAuthpay(channel,totalAmount);
      this.setState({out_trade_no:data});
      this.refs.loading.endLoading();
      const {out_trade_no} = data;
      Keyboard.dismiss();
      this.props.navigator.push({
          screen: 'ScanQRCode',
          title: 'Scan QR Code',
          passProps: {channel,totalAmount,out_trade_no},
          animationType: 'slide-horizontal'
        });
    }catch(error){
      console.log(error)
      Alert.alert(
        "ERROR",
        error,
        [
          {text: 'Ok', onPress:()=>this.refs.loading.endLoading()},
        ],
        { cancelable: false }
      )
    }
  } 
  
  async _checkOrderStatus(channel,outTradeNo) {
    try{
    const {outTradeNo,channel} =this.state;
    const data = await ScanQRCodeModule.checkOrderStatus(channel,outTradeNo);
     if (data.status === 'SUCCESS') {
       console.log(data);
       this.props.navigator.push({
         screen: 'OrderReceipt',
         passProps: {
             merchantName: data.merchantName,
             merchantAddress: data.merchantAddress,
             merchantPhoneNumber: data.merchantPhoneNumber,
             refId: data.refId,
             time: data.time,
             channel: data.channel,
             rate: data.rate,
             totalAmount: data.totalAmount,
             CNYamount: data.CNYamount,
             status: data.status,
         },
         animationType: 'slide-horizontal'
       });
     }
      // alert('_checkOrderStatus',data);
    }catch(error){
      console.log(error)
      Alert.alert(
        "ERROR",
        error,
        [
          {text: 'Ok', onPress:()=>this.refs.loading.endLoading()},
        ],
        { cancelable: false }
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Loading ref="loading" size={60}/>

        <View style={{
          backgroundColor:'#F4F4F4',
          flex:1,
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
            height:Settings.getY(740),
            borderWidth:1
          }}>
            <View style={{marginTop:Settings.getY(28),
              marginLeft:Settings.getY(30),
              flexDirection:'row',
              marginRight:30,}}>
              <Text style={{
                marginLeft:0,
                fontSize:26,
                color:'black',
              }}>
                Subtotal:${this.state.totalAmount}
              </Text>
            </View>

            <View style={{
               marginTop:Settings.getY(25),
               marginBottom:Settings.getY(58),
               marginLeft:Settings.getX(30),
               borderBottomColor: 'rgb(164, 164, 165)',
               borderBottomWidth: 1,

               width: Settings.getX(420),}}>
            </View>

            <View style={styles.rectangleContainer}>
              <QRCode
                value={this.state.codeUrl}
                size={Settings.getX(250)}
                bgColor='black'
                fgColor='white'/>
            </View>

            <TouchableOpacity activeOpacity={0.4} style={{
              marginTop:Settings.getY(60),
              marginBottom:Settings.getY(60),
              marginLeft:Settings.getX(58),
            }}
            onPress={this._goToScanQRCode}>
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
                  Scan
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
