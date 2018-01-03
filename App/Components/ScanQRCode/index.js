/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  Easing,
  ActivityIndicator,
  Alert
} from 'react-native';
import Camera from 'react-native-camera';
import TimerMixin from 'react-timer-mixin';
import Settings from '../../Config/Setting';
import ScanQRCodeModule from '../../Module/ScanQRCode/ScanQRCodeModule';
import Loading from '../Loading';
// import Camera from 'react-native-camera';
export default class ScanQRCode extends Component {
  static navigatorStyle = {
    navBarTextColor:"#c49a6c",
    navBarBackgroundColor:"#2f3038",
    navBarButtonColor:"#c49a6c"
  }
  mixins: [TimerMixin]
  constructor(props)
  {
    super(props);
    this.state = {
        moveAnim: new Animated.Value(0),
        auth_code: '',
        status: '',
        showCamera: true,
        cameraType: Camera.constants.Type.back,
        isShowing: false,
    };
    this._onBarCodeRead = this._onBarCodeRead.bind(this);
    this._createAuthpay = this._createAuthpay.bind(this);
    this._goToCreateQRCode = this._goToCreateQRCode.bind(this);
  }
  componentDidMount() {
    console.log(this.props)
    this.startAnimation();
  }
  
  async _goToCreateQRCode() {
    try {
      this.refs.loading.startLoading();
      const {channel,title,out_trade_no} =  this.props;
      let totalAmount = this.props.totalAmount;
      totalAmount = parseInt(totalAmount*100, 10);
      console.log(channel,totalAmount)
      let response = await fetch(
        'https://mcfpayapi.ca/api/v1/merchant/create_order/',{
          method: 'POST',
          headers: {
            'Auth-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEsInJvbGUiOjEwMSwidXNlcm5hbWUiOiJ0ZXN0VXNlciIsImFjY291bnRfaWQiOjMsImV4cGlyZSI6MTUxMzIyMjM0Nn0.px6eP3IIj8-jwy-cXmGJziPBCQWUIOJU7iY1-5-EVGE',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'vendor_channel': channel,
            'total_fee_currency': 'CAD',
            'device_id':'aaaa',
            'total_fee_in_cent':totalAmount
          }),
        });
      let responseJson = await response.json();
      this.refs.loading.endLoading();
      console.log(responseJson);
      if (responseJson.ev_error == '0') {
        let codeUrl = responseJson.ev_data.code_url;
        let out_trade_no = responseJson.ev_data.out_trade_no
        totalAmount = totalAmount/100;
        this.props.navigator.push({
          screen: 'CreateQRCode',
          title: 'QR Code',
          passProps: {codeUrl,totalAmount,out_trade_no,channel},
          animationType: 'slide-horizontal'
        });
      }
      return responseJson.ev_data;
    } catch (error) {
      console.error(error);
  }
  }
  async _createAuthpay(auth_code) {
       try{
         const {channel,totalAmount,out_trade_no} = this.props;
         console.log(out_trade_no)
         const outTradeNo = out_trade_no;
         const authCode = auth_code;
         const data = await ScanQRCodeModule.createAuthpay(channel, totalAmount, outTradeNo, authCode);
         console.log(data);
         this._checkOrderStatus(channel,outTradeNo);
         this.refs.loading.endLoading();
       }catch(error){
          // alert('_createAuthpay error',error);
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
            title:'Order Receipt',
            animationType: 'slide-horizontal'
          });
        }
         // alert('_checkOrderStatus',data);
       }catch(error){
         console.log(error)
       }
  }


 startAnimation = () => {
      this.state.moveAnim.setValue(0);
      Animated.timing(
          this.state.moveAnim,//初始值
          {
              toValue: -200,
              duration: 1500,
              easing: Easing.linear
          }//结束值
      ).start(() => this.startAnimation());//开始
  };
  _onBarCodeRead(result){
        this.setState({showCamera: false});
        this.refs.loading.startLoading();
        const auth_code = result.data;
        console.log(result);
        console.log(auth_code);
        this._createAuthpay(auth_code);
  };
  _renderCamera() {
          if(this.state.showCamera) {
              return (
                <Camera
                  style={styles.preview}
                  onBarCodeRead={this._onBarCodeRead}
                  type={this.state.cameraType}>
                  <View style={styles.rectangleContainer}>
                    <Image style={{width:Settings.getX(330),height:Settings.getX(330),}}
                      source={require('./image/scanbig.png')}
                      />
                  </View>
                </Camera>
              );
          } else {
              return (
                  <View></View>
              );
          }
  }
  render() {
    return (
      <View style={styles.container}>
        <Loading ref="loading" size={60}/>

        <View style={{
          backgroundColor:'#2f3038',
          flex:1,
          alignItems: 'center',}}>

            <View style={{
              backgroundColor:'white',
              marginTop:Settings.getY(150),
              width:Settings.getX(330),
              height:Settings.getX(330),
             }}>

            {this._renderCamera()}

            </View>
            <TouchableOpacity activeOpacity={0.4} 
            onPress={this._goToCreateQRCode}>
          <View style={{
            alignItems:'center',
            flexDirection:'row',
            justifyContent:'center',
            marginTop:Settings.getY(158),
            height:Settings.getY(36),
            width:Settings.getX(540)
          }}>
            <Image style={{width:Settings.getY(36),
              height:Settings.getY(36)}}
              source={require('./image/scanbig.png')}
            />
            <View style={{width:Settings.getX(14)}}>
            </View>
            <Text style={{fontSize:24,color:'#c49a6c'}}>
              QR Code
            </Text>
          </View>
          </TouchableOpacity>
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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    },
    border: {
    flex: 0,
    width: 200,
    height: 2,
    backgroundColor: '#00FF00',
    },
});
