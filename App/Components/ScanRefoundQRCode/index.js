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
  Alert,
  AsyncStorage
} from 'react-native';
import Camera from 'react-native-camera';
import Settings from '../../Config/Setting';
import Loading from '../Loading';
import DeviceInfo from 'react-native-device-info';
// import Camera from 'react-native-camera';

export default class ScanQRCode extends Component {
  static navigatorStyle = {
    navBarTextColor:"#c49a6c",
    navBarBackgroundColor:"#2f3038",
    navBarButtonColor:"#c49a6c"
  }
  constructor(props)
  {
    super(props);
    this.state = {
        moveAnim: new Animated.Value(0),
        showCamera: true,
        cameraType: Camera.constants.Type.back,
        token: '',
    };
    this._goEnterRefoundNumber = this._goEnterRefoundNumber.bind(this);
    this._onBarCodeRead = this._onBarCodeRead.bind(this);
    this.createRefund = this.createRefund.bind(this);
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
   _goEnterRefoundNumber() {
    this.props.navigator.push({
       screen: 'EnterRefoundNumber',
       navigatorStyle: {
       },
       title: "Enter Refund Number",
       passProps: {},
       animationType: 'slide-horizontal'
     });
   }
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
      console.log(result);
      this.setState({showCamera: false});
      this.refs.loading.startLoading();
      const outTradeNo = result.data;
      this.getRefundOrderDetailFromApi(outTradeNo);
   };
   
   async getRefundOrderDetailFromApi(outTradeNo){

      var id=outTradeNo;
      try {
        const { token } = this.state;
        let response = await fetch(
          'https://mcfpayapi.ca/api/v1/merchant/get_txn_by_id/',{
            method: 'POST',
            headers: {
              'Auth-Token': token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'ref_id':id,
            }),
          });
        let responseJson = await response.json();
        console.log(responseJson);
        if(responseJson.ev_error ===0 ) {
          this.createRefund(responseJson.ev_data);
          return responseJson.ev_data;
        } else if ( responseJson.ev_error ===10010){
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
        }else if(responseJson.ev_error === 10011) {
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
        }else {
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
   async createRefund(order){
      try {
        const {token} = this.state;
        console.log(order);
        let response = await fetch(
          'https://mcfpayapi.ca/api/v1/merchant/create_refund/',{
            method: 'POST',
            headers: {
              'Auth-Token': token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'vendor_channel':order.vendor_channel,
              'total_fee_in_cent':+(order.amount_in_cent),
              'total_fee_currency':order.amount_currency,
              'device_id':DeviceInfo.getSerialNumber(),
              'out_trade_no':order.ref_id,
              'refund_fee_in_cent':+(order.amount_in_cent),
              'refund_fee_currency':order.amount_currency,
              'refund_no':1,
            }),
          });
        this.refs.loading.endLoading();
        let responseJson = await response.json();
        console.log(responseJson);
        const refoundInfo = responseJson.ev_data;
          const name = refoundInfo.merchant_name;
          const refId = refoundInfo.ref_id;
          const time = refoundInfo.time;
          const repeat = refoundInfo.is_repeated;
          const channel = refoundInfo.vendor_channel;
          const rate = refoundInfo.exchange_rate;
          const totalAmount = (+(refoundInfo.amount_in_cent))/100;
          const eo_data = {name,refId,time,channel,rate,totalAmount,repeat};
        this.props.navigator.push({
          screen: 'RefoundReceipt',
          navigatorStyle: {
          },
          title: "Refund Receipt",
          passProps: eo_data,
          animationType: 'slide-horizontal'
        });
        console.log(eo_data);
    //      this.setState({exchangeRate:responseJson.ev_data.exchange_rate})
      } catch (error) {
        console.error(error);
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
          backgroundColor:'#2f3038',
          flex:1,
          alignItems: 'center',}}>
            <View style={{
              backgroundColor:'white',
              marginTop:Settings.getY(150),
              width:Settings.getX(330),
              height:Settings.getX(330), }}>
               {this._renderCamera()}
            </View>
            <TouchableOpacity   onPress={this._goEnterRefoundNumber}>
              <View style={{alignItems:'center',
              flexDirection:'row',
              justifyContent:'center',
              borderRadius: 8,
              marginTop:Settings.getY(158),
              borderColor: '#c49a6c',
              borderWidth:1,
              height:Settings.getY(85),width:Settings.getX(368)}}>
              <Image style={{
                width:Settings.getX(40),
                height:Settings.getX(40)/50*28,
              }}
              onPress={this._goEnterRefoundNumber}

                  source={require('./image/order.png')}
              />
                <View style={{width:Settings.getX(16)}}>
                </View>
                <Text style={{fontSize:24,color:'#c49a6c'}}>
                  Order Number
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
