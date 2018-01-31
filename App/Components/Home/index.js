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
  Alert,
  AsyncStorage
} from 'react-native';
import Settings from '../../Config/Setting';
import Loading from '../Loading';
import HomeModule from '../../Modules/Home/HomeModule';
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      companyCell: '',
      companyName: '',
      waiting: false,
    }
    this._goSelectChannel = this._goSelectChannel.bind(this);
    this._goRefund = this._goRefund.bind(this);
    this._goTransaction = this._goTransaction.bind(this);
    this._logout = this._logout.bind(this);
  }
  componentWillMount() {
    this._getCompanyInfo();
  }
  componentDidMount() {

  }

  async _getCompanyInfo() {
    try{
    const token =await AsyncStorage.getItem('token')
    const data = await HomeModule.getCompanyInfo(token);
    this.setState({
        companyCell: data.cell,
        companyName: data.display_name,
    })

      // alert('_checkOrderStatus',data);
    }catch(error){
      console.log(error)
    }
}
  _goSelectChannel() {
    this.setState({waiting: true});
    const {companyName} = this.state;
    this.props.navigator.push({
       screen: 'SelectChannel',
       navigatorStyle: {
       },
       title: "Select Channel",
       passProps: {companyName},
       animationType: 'slide-horizontal',
     });
     setTimeout(()=> {
      this.setState({waiting: false})
     }, 500);//设置的时间间隔由你决定
  }
  _goRefund() {
    this.setState({waiting: true});
    const {companyName} = this.state;
    this.props.navigator.push({
       screen: 'SelectRefound',
       navigatorStyle: {
       },
       title: "Refund",
       passProps: {companyName},
       animationType: 'slide-horizontal'
     });
     setTimeout(()=> {
      this.setState({waiting: false})
     }, 500);//设置的时间间隔由你决定
  }
  _goTransaction() {
    this.setState({waiting: true});
    const {companyName, companyCell} = this.state;
    this.props.navigator.push({
       screen: 'Transaction',
       navigatorStyle: {
       },
       title: "Transaction",
       passProps: {
         companyName,
         companyCell,
       },
       animationType: 'slide-horizontal'
     });
     setTimeout(()=> {
      this.setState({waiting: false})
     }, 500);//设置的时间间隔由你决定
  }
  _logout() {
    Alert.alert(
      "Log out",
      "Are you logging out?",
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          this.props.navigator.popToRoot({
             animated: true,
             animationType: 'fade',
           });
        }},
      ],
      { cancelable: false }
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Loading ref="loading" size={60}/>
        <TouchableOpacity
          disabled={this.state.waiting}
          activeOpacity={0.4}
          onPress={this._goSelectChannel}
          style={{
            marginTop:Settings.getY(106),
          }}
          >
          <View style={{
            borderColor:'#C49A6C',
            borderWidth:1,
            width:Settings.getX(380),
            height:Settings.getY(120),
            borderRadius: 8,
            backgroundColor:'rgba(0,0,0,0)',
            alignItems: 'center',
            flexDirection:'row',
          }}>

          <View style={{marginLeft:15,}}>
            <Image style={{
              height:Settings.getX(49),
              width:Settings.getX(45)/49*62,
            }}
                source={require('./image/pay.png')}
            />

          </View>

                <View style={{justifyContent:'center',alignItems: 'center',flex:1}}>
                  <Text style={{
                    fontSize:16,

                    color:'#C49A6C',
                  }}>
                    PAYMENT
                  </Text>
                </View>

          </View>

        </TouchableOpacity>

        <TouchableOpacity
          disabled={this.state.waiting}
          activeOpacity={0.4}
          onPress={this._goRefund}
          style={{
            marginTop:Settings.getY(70),
          }}
          >
          <View style={{
            borderColor:'#C49A6C',
            borderWidth:1,
            width:Settings.getX(380),
            height:Settings.getY(120),
            borderRadius: 8,
            backgroundColor:'rgba(0,0,0,0)',
            alignItems: 'center',
            flexDirection:'row',
          }}>

          <View style={{marginLeft:15,}}>
            <Image style={{
              height:Settings.getX(45),
              width:Settings.getX(45)/49*62,
            }}
                source={require('./image/refound.png')}
            />

          </View>

                <View style={{justifyContent:'center',alignItems: 'center',flex:1}}>
                  <Text style={{
                    fontSize:16,

                    color:'#C49A6C',
                  }}>
                    REFUND
                  </Text>
                </View>

          </View>

        </TouchableOpacity>

        <TouchableOpacity
          disabled={this.state.waiting}
          activeOpacity={0.4}
          onPress={this._goTransaction}
          style={{
            marginTop:Settings.getY(70),
          }}
          >
          <View style={{

            borderColor:'#C49A6C',
            borderWidth:1,
            width:Settings.getX(380),
            height:Settings.getY(120),
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
                source={require('./image/order.png')}
            />

          </View>

                <View style={{justifyContent:'center',alignItems: 'center',flex:1}}>
                  <Text style={{
                    fontSize:16,

                    color:'#C49A6C',
                  }}>
                    TRANSACTION
                  </Text>
                </View>

          </View>

        </TouchableOpacity>

        <TouchableOpacity
          disabled={this.state.waiting}
          activeOpacity={0.4}
          onPress={this._logout}
          style={{
            marginTop:Settings.getY(70),
          }}
          >
          <View style={{
            borderColor:'#C49A6C',
            borderWidth:1,
            width:Settings.getX(380),
            height:Settings.getY(120),
            borderRadius: 8,
            backgroundColor:'rgba(0,0,0,0)',
            alignItems: 'center',
            flexDirection:'row',
          }}>

          <View style={{marginLeft:17,}}>
            <Image style={{
              height:Settings.getX(55),
              width:Settings.getX(55)/53*56,
            }}
                source={require('./image/logout.png')}
            />

          </View>

                <View style={{justifyContent:'center',alignItems: 'center',flex:1}}>
                  <Text style={{
                    fontSize:16,

                    color:'#C49A6C',
                  }}>
                    LOG OUT
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
