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
  Alert,
  AsyncStorage
} from 'react-native';
import Camera from 'react-native-camera';
import TimerMixin from 'react-timer-mixin';
import Settings from '../../Config/Setting';
import ScanQRCodeModule from '../../Modules/ScanQRCode/ScanQRCodeModule';
import DeviceInfo from 'react-native-device-info';
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
        token: '',
    };
    this._onBarCodeRead = this._onBarCodeRead.bind(this);
    this._createAuthpay = this._createAuthpay.bind(this);
    this._goToCreateQRCode = this._goToCreateQRCode.bind(this);
  }
  componentDidMount() {
    this.startAnimation();
    this.getToken();
  }
  async getToken() {
    const data =await AsyncStorage.getItem('token');
    this.setState({
      token: data,
    })
  }
  async _goToCreateQRCode() {
    try {
      this.refs.loading.startLoading();
      const {channel,title,out_trade_no} =  this.props;
      const {token} = this.state
      let totalAmount = this.props.totalAmount;
      totalAmount = parseInt(totalAmount*100, 10);
      console.log(channel,totalAmount)
      let response = await fetch(
        'https://mcfpayapi.ca/api/v1/merchant/create_order/',{
          method: 'POST',
          headers: {
            'Auth-Token': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'vendor_channel': channel,
            'total_fee_currency': 'CAD',
            'device_id':DeviceInfo.getSerialNumber(),
            'total_fee_in_cent':totalAmount
          }),
        });
      let responseJson = await response.json();
      this.refs.loading.endLoading();
      console.log(responseJson);
      if (responseJson.ev_error == '0') {
        let codeUrl = responseJson.ev_data.code_url;
        let out_trade_no = responseJson.ev_data.out_trade_no
        let totalAmount = responseJson.ev_data.total_fee_in_cent / 100;
        console.log(totalAmount)
        this.props.navigator.push({
          screen: 'CreateQRCode',
          title: 'QR Code',
          passProps: {token,codeUrl,totalAmount,out_trade_no,channel},
          animationType: 'slide-horizontal'
        });
        return responseJson.ev_data;
      } else if(responseJson.ev_error === 10010) {
        Alert.alert(
          "ERROR",
          'Token Expires, please login again.',
          [
            {text: 'Ok',onPress:()=>{
              this.props.navigator.push({
              screen: 'Login',
              title: '',
              navigatorStyle: {
                navBarHidden: true
              },
              passProps: {},
              animationType: 'slide-horizontal'
            });}},
          ],
          { cancelable: false }
        )
      }  else if(responseJson.ev_error === 10011) {
        Alert.alert(
          "ERROR",
          'Your account has been logged in from another device.',
          [
            {text: 'Ok',onPress:()=>{
              this.props.navigator.push({
              screen: 'Login',
              title: '',
              navigatorStyle: {
                navBarHidden: true
              },
              passProps: {},
              animationType: 'slide-horizontal'
            });}},
          ],
          { cancelable: false }
        )
      }  else {
        Alert.alert(
          "ERROR",
          'Invalid QR Code',
          [
            {text: 'Ok', onPress:()=>this.refs.loading.endLoading()},
          ],
          { cancelable: false }
        )
      }  
    } catch (error) {
      console.error(error);
  }
  }
  async _createAuthpay(auth_code) {
       try{
         const {channel,totalAmount,out_trade_no} = this.props;
         const {token} = this.state
         console.log(out_trade_no)
         const outTradeNo = out_trade_no;
         const authCode = auth_code;
         const data = await ScanQRCodeModule.createAuthpay(token,channel, totalAmount, outTradeNo, authCode);
         console.log(data);
         this._checkOrderStatus(channel,outTradeNo);
         this.refs.loading.endLoading();
       }catch(error){
          // alert('_createAuthpay error',error);
         console.log(error)
         if (error == 'TOKEN_EXPIRE') {
            Alert.alert(
              "ERROR",
              'Token Expires, please login again.',
              [
                {text: 'Ok',onPress:()=>{
                  this.props.navigator.push({
                  screen: 'Login',
                  title: '',
                  navigatorStyle: {
                    navBarHidden: true
                  },
                  passProps: {},
                  animationType: 'slide-horizontal'
                });}},
              ],
              { cancelable: false }
            )
          } else if(error == 'TOKEN_EXPIRE') {
            Alert.alert(
              "ERROR",
              'Your account has been logged in from another device.',
              [
                {text: 'Ok',onPress:()=>{
                  this.props.navigator.push({
                  screen: 'Login',
                  title: '',
                  navigatorStyle: {
                    navBarHidden: true
                  },
                  passProps: {},
                  animationType: 'slide-horizontal'
                });}},
              ],
              { cancelable: false }
            )
          }   else {
            Alert.alert(
              "ERROR",
              error,
              [
                {text: 'Ok'},
              ],
              { cancelable: false }
            )
          }
       }
  }
  async _checkOrderStatus(channel,outTradeNo) {
       try{
       const {token} = this.state
       const data = await ScanQRCodeModule.checkOrderStatus(token,channel,outTradeNo);
        if (data.status === 'SUCCESS') {
          console.log(data);
          this.props.navigator.push({
            screen: 'OrderReceipt',
            navigatorStyle: {
              navBarHidden: true
            },
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
        if (error == 'TOKEN_EXPIRE') {
          Alert.alert(
            "ERROR",
            'Token Expires, please login again.',
            [
              {text: 'Ok',onPress:()=>{
                this.refs.loading.endLoading();
                this.props.navigator.push({
                screen: 'Login',
                title: '',
                navigatorStyle: {
                  navBarHidden: true
                },
                passProps: {},
                animationType: 'slide-horizontal'
              });}},
            ],
            { cancelable: false }
          )
        }else if(error == 'TOKEN_KICKED') {
          Alert.alert(
            "ERROR",
            'Your account has been logged in from another device.',
            [
              {text: 'Ok',onPress:()=>{
                this.props.navigator.push({
                screen: 'Login',
                title: '',
                navigatorStyle: {
                  navBarHidden: true
                },
                passProps: {},
                animationType: 'slide-horizontal'
              });}},
            ],
            { cancelable: false }
          )
        }   else {
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
