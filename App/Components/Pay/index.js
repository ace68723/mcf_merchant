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
  Modal,
  ActivityIndicator,
  Button,
  Alert,
  AsyncStorage
} from 'react-native';
import PayModule from '../../Module/Pay/PayModule';
import Settings from '../../Config/Setting';
import Loading from '../Loading';
import DeviceInfo from 'react-native-device-info';
export default class Pay extends Component {
  static navigatorStyle = {
    navBarTextColor:"#c49a6c",
    navBarBackgroundColor:"#2f3038",
    navBarButtonColor:"#c49a6c"
  }
  constructor(props){
    super(props);
    this.state = {
      isShowing: false,
      amount:props.enterAmount,
      tips:0,
      totalAmount: 0,
      totalRMB:0,
      backgroundColor1:'white',
      backgroundColor2:'white',
      backgroundColor3:'white',
      fontColor1:'#939598',
      fontColor2:'#939598',
      fontColor3:'#939598',
      tipAmount:'',
      tipsType:'',
      tradeNumber: '',
      exchangeRate: '',
      out_trade_no: '',
      token: ''
    };
    this._pressButton1=this._pressButton1.bind(this);
    this._pressButton2=this._pressButton2.bind(this);
    this._pressButton3=this._pressButton3.bind(this);
    this._pressButton4=this._pressButton4.bind(this);
    this._calculateTips=this._calculateTips.bind(this);
    this._calculateTotal=this._calculateTotal.bind(this);
    this._calculateCNY=this._calculateCNY.bind(this);
    this._calculateRate=this._calculateRate.bind(this);
    this._createOrder=this._createOrder.bind(this);
  }
  componentWillMount(){
    var results=this.getMoviesFromApi();
  }
  async getMoviesFromApi() {
    try {
      const data =await AsyncStorage.getItem('token');
      this.setState({
        token:data
      })
      const {token} = this.state;
      let response = await fetch(
        'https://mcfpayapi.ca/api/v1/merchant/get_exchange_rate/',{
          method: 'POST',
          headers: {
            'Auth-Token': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'vendor_channel': 'wx',
            'currency_type': 'CAD',
          }),
        });
      let responseJson = await response.json();
      if (responseJson.ev_error === 0) {
        this.setState({exchangeRate:responseJson.ev_data.exchange_rate})
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
      } else if(responseJson.ev_error === 10011) {
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
      }  
    } catch (error) {
      console.error(error);
    }
  }

  _createOrder()
  {
    this.refs.loading.startLoading();
    console.log('createOrder');
    let totalAmount = this._calculateTotal();
    totalAmount = parseInt(totalAmount*100 , 10)
    var orderDetail=this._getOrderDetailFromApi(totalAmount);
  }
  async _getOrderDetailFromApi(totalAmount){
    try {
      const {channel,title,companyName,out_trade_no} =  this.props;
      const {token} = this.state;
      console.log(totalAmount);
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
      if (responseJson.ev_error === 0) {
        let codeUrl = responseJson.ev_data.code_url;
        let out_trade_no = responseJson.ev_data.out_trade_no
        let totalAmount = this._calculateTotal();
        console.log(totalAmount);
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
      } else if(responseJson.ev_error === 10011) {
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
  async preCreateAuthpay() {
    const {channel,title,companyName} =  this.props;
    const {tipAmount,token} = this.state;
    let totalAmount = this._calculateTotal();
    const reg = /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/;
    console.log(tipAmount,reg.test(tipAmount))
    if(this.state.tipsType=='1' ||
       this.state.tipsType=='2' ||
       this.state.tipsType=='3' ||
       this.state.tipAmount == 0||
       (this.state.tipsType == '4' && reg.test(tipAmount))
      ){
        try{
          this.refs.loading.startLoading();
          const data = await PayModule.preCreateAuthpay(token,channel,totalAmount);
          this.setState({out_trade_no:data});
          this.refs.loading.endLoading();
          const {out_trade_no} = data;
          Keyboard.dismiss();
          this.props.navigator.push({
             screen: 'ScanQRCode',
             title: 'Scan QR Code',
             passProps: {token,channel,totalAmount,out_trade_no,companyName},
             animationType: 'slide-horizontal'
           });
        }catch(error){
          console.log(error)
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
          } if (error == 'TOKEN_KICKED') {
            Alert.alert(
              "ERROR",
              'Your account has been logged in from another device.',
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
          } else {
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
      } else { return }
  }
  _calculateTips()
  {
    if (this.state.tipsType=='1') return (this.state.amount*0.1).toFixed(2);
    if (this.state.tipsType=='2') return (this.state.amount*0.15).toFixed(2);
    if (this.state.tipsType=='3') return (this.state.amount*0.2).toFixed(2);
    if (this.state.tipsType=='4') return (+(this.state.tipAmount)).toFixed(2);
    return 0;
  }
  _calculateRate()
  {
    return (+(this.state.exchangeRate)).toFixed(2);
  }
  _calculateTotal()
  {
    var total=+this.state.amount;
    console.log(total);
    total=total+(+this._calculateTips());
    console.log(total);
    return total.toFixed(2);
  }
  _calculateCNY()
  {
    return (this._calculateTotal()*(+(this.state.exchangeRate))).toFixed(2)
  }
  _pressButton1()
  {
    console.log('btn1');
    Keyboard.dismiss();
    this.setState({
      backgroundColor1:'#2f3038',
      backgroundColor2:'white',
      backgroundColor3:'white',
      fontColor1:'white',
      fontColor2:'#939598',
      fontColor3:'#939598',
      tipsType:'1',
      tipAmount:'',
    });
  }
  _pressButton2()
  {
    Keyboard.dismiss();
      console.log('btn2');
    this.setState({
      backgroundColor1:'white',
      backgroundColor2:'#2f3038',
      backgroundColor3:'white',
      fontColor1:'#939598',
      fontColor2:'white',
      fontColor3:'#939598',
      tipsType:'2',
      tipAmount:'',
    });
  }

  _pressButton3()
  {
      Keyboard.dismiss();
      console.log('btn3');
    this.setState({
      backgroundColor1:'white',
      backgroundColor2:'white',
      backgroundColor3:'#2f3038',
      fontColor1:'#939598',
      fontColor2:'#939598',
      fontColor3:'white',
      tipsType:'3',
      tipAmount:'',
    });
  }
  _pressButton4()
  {
      console.log('btn3');
    this.setState({
      backgroundColor1:'white',
      backgroundColor2:'white',
      backgroundColor3:'white',
      fontColor1:'#939598',
      fontColor2:'#939598',
      fontColor3:'#939598',
      tipsType:'4',
      tipAmount:'',
    });
  }
  _roundTwoDig(num)
  {
    var total=this.state.tipAmount;
    var loca=total.length;
    if (total[loca-3]==='.' && num.length>loca)
    {
      console.log(loca);
      console.log(total);
      return;
    }
    this.setState({tipAmount:num});
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
          borderWidth:2
        }}>
          <View style={{
            backgroundColor:'white',
             borderRadius:8,
             marginTop:Settings.getY(26),
             borderColor:'#D1D3D4',
             width:Settings.getX(484),
             height:Settings.getY(740),
             borderWidth:2
           }}>
            <View style={{
              marginTop:Settings.getY(28),
              marginLeft:Settings.getY(30),
              flexDirection:'row',
              marginRight:30,
            }}>
              <Text style={{marginLeft:0,fontSize:14,color:'black',}}>
                Subtotal:${this.state.amount}
              </Text>
              <View style={{width:40}}>
              </View>
              <Text style={{fontSize:12,color:'#939598'}}>
                Exchange Rate:{this._calculateRate()}
              </Text>

            </View>
            <Text style={{
              marginLeft:Settings.getX(30),
              fontSize:14,color:'black',
              marginTop:Settings.getX(25)
            }}>
              Tips:
              <Text style={{color:'black'}}>
                ${this._calculateTips()}
              </Text>
            </Text>
            <Text style={{
              marginLeft:Settings.getX(30),
              fontSize:14,
              color:'black',
              marginTop:Settings.getX(25)}}>
              Total:
              <Text style={{color:'black'}}>
                ${this._calculateTotal()}
              </Text>
            </Text>
            <Text style={{marginLeft:Settings.getX(30),
                          fontSize:14,
                          color:'black',
                          marginTop:Settings.getX(25)}}>
              CNY Amount ≈ ¥{this._calculateCNY()}
            </Text>
            <View style={{
               marginTop:Settings.getY(20),
               marginLeft:Settings.getX(30),
               borderBottomColor: '#808285',
               borderBottomWidth: 1,
               width: Settings.getX(420),}}>
            </View>
            <Text style={{
              marginLeft:Settings.getX(30),
              marginTop:Settings.getY(20),
              fontSize:14,
              color:'black'}}>
              Tips:
            </Text>
            <View style={{
              marginLeft:Settings.getX(30),
              marginTop:Settings.getY(25),
              width:Settings.getX(430),
              height:Settings.getY(42),
              flexDirection:'row',}}>
              <TouchableOpacity activeOpacity={0.4} onPress={this._pressButton1}>
                <View style={{
                  borderColor:'#c49a6c',
                  borderWidth:2,
                  borderRadius:8,
                  backgroundColor:this.state.backgroundColor1,
                  justifyContent:'center',alignItems: 'center',
                  width:Settings.getX(134),
                  height:Settings.getY(40),
                }}>
                  <Text style={{color:this.state.fontColor1, fontSize:12}}>
                    10%
                  </Text>
                </View>

              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft:Settings.getX(10)}}
                                activeOpacity={0.4}
                                onPress={this._pressButton2}>
                <View style={{
                  borderColor:'#c49a6c',
                  borderWidth:2,
                  borderRadius:8,
                  backgroundColor:this.state.backgroundColor2,
                  justifyContent:'center',alignItems: 'center',
                  width:Settings.getX(134),
                  height:Settings.getY(40),
                }}>
                  <Text style={{color:this.state.fontColor2, fontSize:12}}>
                    15%
                  </Text>
                </View>

              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft:Settings.getX(10)}} activeOpacity={0.4} onPress={this._pressButton3}>
                <View style={{
                  borderColor:'#c49a6c',
                  borderWidth:2,
                  borderRadius:8,
                  backgroundColor:this.state.backgroundColor3,
                  justifyContent:'center',alignItems: 'center',
                  width:Settings.getX(134),
                  height:Settings.getY(40),
                }}>
                  <Text style={{color:this.state.fontColor3, fontSize:12}}>
                    20%
                  </Text>
                </View>

              </TouchableOpacity>
            </View>
            <View style={{
              marginTop:Settings.getY(30),
              marginLeft:Settings.getX(30),
              width:Settings.getX(430),
              height:Settings.getY(42),
              flexDirection:'row',
              alignItems: 'center',
              justifyContent:'center',
            }}>

                <Text style={{color:'black', fontSize:12}}>
                  Customized
                </Text>
              <View style={{
                marginLeft:Settings.getX(10),
                borderColor:'#c49a6c',
                borderWidth:2,
                borderRadius:8,
                alignItems: 'center',
                justifyContent:'center',
                width:Settings.getX(280),
                height:Settings.getY(40),
              }}>

                <TextInput
                  style={{
                    backgroundColor:'rgba(0,0,0,0)',
                    fontSize:12,
                    height:40,
                    width:180,
                    paddingLeft:20
                  }}
                  keyboardType="numeric"
                  onChangeText={(tipAmount) => this._roundTwoDig(tipAmount)}
                  value={this.state.tipAmount}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  onFocus={this._pressButton4}
                />
                <Text style={{color:'black',
                              fontSize:12,
                              position:'absolute',
                              left:10,
                            }}>
                  $
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

            <TouchableOpacity activeOpacity={0.4}
              onPress={()=>this.preCreateAuthpay()}
              style={{marginTop:Settings.getY(40),marginLeft:Settings.getX(58),}}>
              <View style={{
                width:Settings.getX(368),
                height:Settings.getY(85),borderRadius:8,backgroundColor:'#2f3038',
                alignItems: 'center',
                justifyContent:'center',flexDirection:'row',
              }}>
                <Image style={{height:Settings.getY(34),width:Settings.getY(34)}}
                  source={require('./image/ScanGold.png')}
                />
                <View style={{width:15}}>
                </View>
                <Text style={{fontSize:24,color:'#c49a6c'}}>
                  Scan
                </Text>
              </View>

            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.4} onPress={this._createOrder} style={{
              marginTop:Settings.getY(27),
              marginLeft:Settings.getX(58),
            }}>
              <View style={{
                width:Settings.getX(368),
                height:Settings.getY(85),borderRadius:8,backgroundColor:'#2f3038',
                alignItems: 'center',
                justifyContent:'center',flexDirection:'row',
              }}>
                <Image style={{height:Settings.getY(34),
                  width:Settings.getY(34)}}
                  source={require('./image/QRCODE.png')}
                />
                <View style={{width:15}}>
                </View>
                <Text style={{fontSize:24,color:'#c49a6c'}}>
                  QR Code
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
  }
});
