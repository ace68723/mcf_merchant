import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Loading from '../Loading';
import Settings from '../../Config/Setting';
export default class EnterAmount extends Component {
  static navigatorStyle = {
    navBarTextColor:"#c49a6c",
    navBarBackgroundColor:"#2f3038",
    navBarButtonColor:"#c49a6c"
  }
  constructor(props)
  {
    super(props);
    this.state = { 
      orderNumber: "",
      waiting: false,
    };
    this._goScanRefoundQR = this._goScanRefoundQR.bind(this);
    this._setOrderNumber=this._setOrderNumber.bind(this);
    this.getRefundOrderDetailFromApi=this.getRefundOrderDetailFromApi.bind(this);
    this.createRefund=this.createRefund.bind(this);
  }

  async getRefundOrderDetailFromApi(){
    this.setState({
      waiting: true,
    })
    console.log(this.state);
    var id=this.state.orderNumber;
    try {
      const token =await AsyncStorage.getItem('token');
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
      if(responseJson.ev_error === 0){
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
      }   else {
        Alert.alert(
          "ERROR",
          'Invalid Order Number',
          [
            {text: 'Ok'},
          ],
          { cancelable: false }
        )
      }
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      this.setState({
        waiting: false,
      })
     }, 500);
  }
  async createRefund(order){
    try {
      const token =await AsyncStorage.getItem('token');
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
      let responseJson = await response.json();
      const refoundInfo = responseJson.ev_data;
         const name = refoundInfo.merchant_name;
         const refId = refoundInfo.ref_id;
         const time = refoundInfo.time;
         const channel = refoundInfo.vendor_channel;
         const rate = refoundInfo.exchange_rate;
         const totalAmount = (+(refoundInfo.amount_in_cent))/100;
         const eo_data = {name,refId,time,channel,rate,totalAmount};
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
    }
  }
  _goScanRefoundQR() {
    this.setState({
      waiting: true,
    })
    this.props.navigator.push({
       screen: 'ScanRefoundQRCode',
       navigatorStyle: {
       },
       title: "Scan Refund QR Code",
       passProps: {},
       animationType: 'slide-horizontal'
     });
     setTimeout(() => {
      this.setState({
        waiting: false,
      })
     }, 500);
  }
  _setOrderNumber(num)
  {
    var total=this.state.orderNumber;
    this.setState({orderNumber:num});
  }
  render() {
    return (
      <View style={styles.container}>
      <Loading ref="loading" size={60}/>
      <View
        style={{
          backgroundColor:'white',
          width:Settings.getX(484),
          marginTop:Settings.getY(46),
          height:Settings.getY(450),
        }}
      >
          <View style={{flexDirection:'row',
                        marginRight:30,
                      }}>
            <Text style={{marginTop:Settings.getY(36),
                          marginLeft:Settings.getX(38),
                          fontSize:24,
                        }}>
                Order Number
            </Text>
            <TouchableOpacity
              disabled = {this.state.waiting}
                style={{
                  marginLeft:Settings.getX(150),
                  marginTop:Settings.getY(36)
                }}
                onPress={this._goScanRefoundQR}
                >
              <Image style={{
                height:Settings.getX(45),
                width:Settings.getX(45)/53*56,
              }}
                  source={require('./image/ScanGold.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop:Settings.getY(36),
                        marginLeft:Settings.getX(38),
                        height:Settings.getY(65),
                        justifyContent:'center',
                      }}>
            <TextInput
              style={{
                marginLeft:Settings.getX(5),
                fontSize:18,
              }}
              onChangeText={(orderNumber) => this._setOrderNumber(orderNumber)}
              value={this.state.totalAmount}
              placeholder=""
              underlineColorAndroid='rgba(0,0,0,0)'

            />
          </View>
          <View style={{
            width:Settings.getX(484),
            height:Settings.getY(200),
            alignItems:'center',
          }}>
            <View style={{
               marginTop:Settings.getY(30),
               borderBottomColor: '#D1D3D4',
               borderBottomWidth: 1,
               width: Settings.getX(420),}}>
            </View>

            <TouchableOpacity
              disabled = {this.state.waiting}
              style={{
                marginTop:Settings.getY(60),
              }}  
              activeOpacity={0.4}
              onPress={this.getRefundOrderDetailFromApi}
            >
            <View style={{
              borderRadius: 8,
              alignItems:'center',
              backgroundColor:'#2f3038',
              justifyContent:'center',
              width:Settings.getY(368),
              height:Settings.getX(85),
            }}>
              <Text style={{
                fontSize:26,
                color:'#c49a6c',

              }}>
                Confirm
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
    backgroundColor:'#D1D3D4',
    alignItems: 'center',
  },
});
