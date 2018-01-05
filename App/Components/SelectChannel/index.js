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
  static navigatorStyle = {
    navBarTextColor:"#c49a6c",
    navBarBackgroundColor:"#2f3038",
    navBarButtonColor:"#c49a6c"
  }
  constructor(props)
  {
    super(props);
    this.state = {
      waiting: false,
    }
    this._goEnterAmount=this._goEnterAmount.bind(this);
  }
  _goEnterAmount(channel)
  {
    this.setState({waiting: true});
    let title;
     const {companyName} = this.props;
    if(channel === 'wx'){
      title = 'WeChat Pay'
    }else if(channel === 'ali') {
      title = 'ALIPAY'
    }
    this.props.navigator.push({
       screen: 'EnterAmount',
       title: title ,
       passProps: {channel,title,companyName},
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
          style={{

            marginTop:Settings.getY(144),

          }}
          activeOpacity={0.4}
          onPress={this._goEnterAmount.bind(null,'wx')}>
            <View style={{
              width:Settings.getX(418),
              height:Settings.getY(152),
              justifyContent:'center',
              borderRadius: 8,
              alignItems: 'center',
              backgroundColor:'white'
            }}>
              <Image style={{
                width:Settings.getX(270),
                height:Settings.getY(270)/274*97,

              }}
                source={require('./image/wechat.png')}
              />

            </View>
          </TouchableOpacity>

          <TouchableOpacity
          disabled = {this.state.waiting}
          style={{
            marginTop:Settings.getY(78),

          }}
          activeOpacity={0.4}
          onPress={this._goEnterAmount.bind(null,'ali')}>
            <View style={{
              width:Settings.getX(418),
              height:Settings.getY(152),
              justifyContent:'center',
              borderRadius: 8,
              alignItems: 'center',
              backgroundColor:'white'
            }}>
              <Image style={{
                position:'absolute',
                width:Settings.getX(270),
                height:Settings.getY(270)/274*97,
                left:47,
                top:18,
              }}
                source={require('./image/ali.png')}
              />

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
    backgroundColor: '#2f3038',
  },
});
