import React, { Component } from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
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
      enterAmount: "0.00",
      waiting: false,
    };
    this._roundTwoDig=this._roundTwoDig.bind(this);
    this._handleConfirm=this._handleConfirm.bind(this);
  }
  _handleConfirm()
  {
    this.setState({waiting: true})
    const reg = /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/;
    console.log(this.state.enterAmount,reg.test(this.state.enterAmount))
    if( !reg.test(this.state.enterAmount)){
      //fire alert
      this.setState({waiting: false})
      return
    }
    const {channel,title} = this.props;
    const {enterAmount,companyName} = this.state;
    Keyboard.dismiss();
    this.props.navigator.push({
       screen: 'Pay',
       title: title ,
       passProps: {channel,title,enterAmount,companyName},
       animationType: 'slide-horizontal'
     });
     setTimeout(()=> {
      this.setState({waiting: false})
     }, 500);//设置的时间间隔由你决定

  }
  async _roundTwoDig(num)
  {
    let total = num;
    let loca = total.length;
    let digtal='';
    let i;
    for (i = 0;i < loca; i++)
    {
      if (total[i]>='1' && total[i]<='9') break;
    }
    for (let j = i; i < loca; i++)
    {
      if (total[i]>='0' && total[i]<='9') digtal=digtal+total[i];
    }
    let len = digtal.length;
    let finalNumber = '';
    if (len==0) { finalNumber = '0.00';}
    else if (len==1) {
      finalNumber='0.0'+digtal;
    }
    else if (len==2){
      finalNumber='0.'+digtal;
    }
    else if (len>2){
      finalNumber='.' + digtal[len-2] + digtal[len-1];
      for (let j=len-3;j>=0;j--)
      {
        finalNumber=digtal[j]+finalNumber;
      }
    }
    this.setState({enterAmount:finalNumber});

  }
  render() {
    return (
      <View style={styles.container}>
          <Loading ref="loading" size={60}/>
          <View
            style={{
              backgroundColor:'white',
              width:Settings.getX(520),
              height:Settings.getY(600),

            }}
          >
            <Text style={{
              marginTop:Settings.getY(36),
              marginLeft:Settings.getX(38),
              fontSize:60,
              fontWeight:'bold',
              color:'black'
            }}>
              ${this.state.enterAmount}
            </Text>

            <View style={{
              marginLeft:Settings.getX(38),
              flexDirection:'row',
              alignItems:'center',
              }}>
              <Text style={{
                fontSize:30,
                marginTop:Settings.getY(5)
              }}>
                Total  $
              </Text>

              <TextInput
                autoFocus
                style={{
                  flex:1,
                  marginLeft:Settings.getX(5),
                  fontSize:30,
                }}
                onChangeText={(enterAmount) => this._roundTwoDig(enterAmount)}
                value={this.state.enterAmount}
                placeholder="0.00"
                underlineColorAndroid='rgba(0,0,0,0)'
                keyboardType="numeric"
              />
            </View>

            <View style={{
              width:Settings.getX(484),
              height:Settings.getY(200),
              alignItems:'center',
              alignSelf:'center'
            }}>
              <View style={{
                 marginTop:Settings.getY(10),
                 borderBottomColor: '#D1D3D4',
                 borderBottomWidth: 1,

                 width: Settings.getX(420),}}>
              </View>

              <TouchableOpacity
                disabled = {this.state.waiting}
                style={{
                  marginTop:Settings.getY(30),
                }}
                activeOpacity={0.4}
                onPress={this._handleConfirm}
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
    backgroundColor:'#2f3038',
    alignItems: 'center',
  },
});
