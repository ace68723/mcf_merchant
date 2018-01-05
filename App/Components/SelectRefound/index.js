/* @flow */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Settings from '../../Config/Setting';
import Loading from '../Loading';
export default class Home extends Component {
  constructor() {
    super();
    this.state= {
      waiting: false,
    }
    this._goScanRefoundQR = this._goScanRefoundQR.bind(this);
    this._goEnterRefoundNumber = this._goEnterRefoundNumber.bind(this);

  }
  static navigatorStyle = {
    navBarTextColor:"#c49a6c",
    navBarBackgroundColor:"#2f3038",
    navBarButtonColor:"#c49a6c"
  }
  _goScanRefoundQR() {
    this.setState({waiting: true});
    this.props.navigator.push({
       screen: 'ScanRefoundQRCode',
       navigatorStyle: {
       },
       title: "Scan Refund QR Code",
       passProps: {},
       animationType: 'slide-horizontal'
     });
     setTimeout(()=> {
      this.setState({waiting: false})
     }, 500);//设置的时间间隔由你决定
  }
  _goEnterRefoundNumber() {
    this.setState({waiting: true});
    this.props.navigator.push({
       screen: 'EnterRefoundNumber',
       navigatorStyle: {
       },
       title: "Enter Refund Number",
       passProps: {},
       animationType: 'slide-horizontal'
     });
     setTimeout(()=> {
      this.setState({waiting: false})
     }, 500);//设置的时间间隔由你决定
  }
  render() {
    return (
      <View style={styles.container}>
        <Loading ref="loading" size={60}/>
        <TouchableOpacity
          disabled = {this.state.waiting}
          activeOpacity={0.4}
          onPress={this._goScanRefoundQR}
          style={{
            marginTop:Settings.getY(174),
          }}
          >
          <View style={{

            borderColor:'#C49A6C',
            borderWidth:1,
            width:Settings.getX(418),
            height:Settings.getY(152),
            borderRadius: 8,
            backgroundColor:'rgba(0,0,0,0)',

            alignItems: 'center',
            flexDirection:'row',
          }}>

          <View style={{marginLeft:12,}}>
            <Image style={{
              height:Settings.getX(55),
              width:Settings.getX(50)/53*56,
            }}
                source={require('./image/ScanGold.png')}
            />

          </View>

                <View style={{justifyContent:'center',alignItems: 'center',flex:1}}>
                  <Text style={{
                    fontSize:16,

                    color:'#C49A6C',
                  }}>
                    Scan QR Code
                  </Text>
                </View>

          </View>

        </TouchableOpacity>

        <TouchableOpacity
          disabled = {this.state.waiting}
          activeOpacity={0.4}
          onPress={this._goEnterRefoundNumber}
          style={{
            marginTop:Settings.getY(112),
          }}
          >
          <View style={{

            borderColor:'#C49A6C',
            borderWidth:1,
            width:Settings.getX(418),
            height:Settings.getY(152),
            borderRadius: 8,
            backgroundColor:'rgba(0,0,0,0)',

            alignItems: 'center',
            flexDirection:'row',
          }}>

          <View style={{marginLeft:17,}}>
            <Image style={{
              width:Settings.getX(55),
              height:Settings.getX(55)/50*28,
            }}
                source={require('./image/order.png')}
            />

          </View>

                <View style={{justifyContent:'center',alignItems: 'center',flex:1}}>
                  <Text style={{
                    fontSize:16,

                    color:'#C49A6C',
                  }}>
                    Enter Order Number
                  </Text>
                </View>

          </View>

        </TouchableOpacity>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2F3038',
  },
});
