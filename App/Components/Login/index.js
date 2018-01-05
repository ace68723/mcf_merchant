import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  NativeModules,
  Button,
  Alert,
  AsyncStorage
} from 'react-native';
import LoginModule from '../../Module/Login/LoginModule';
import Settings from '../../Config/Setting'
import Loading from '../Loading';


export default class Login extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = { merchantId:'',
                   username:'',
                   password:'',
                   isShowing: false,
                 };

  }
  componentWillMount()
  {

  }

  async login(merchantId, username, password){

       try{
          this.refs.loading.startLoading();
          const data = await LoginModule.login(merchantId, username, password);
          await AsyncStorage.setItem('token', data.token);
          data =await AsyncStorage.getItem('token')
          console.log(data)
          this.refs.loading.endLoading();
          this.props.navigator.push({
              screen: 'Home',
              navigatorStyle: {
                navBarHidden: true
              },
              passProps: {},
              animationType: 'slide-down'
            });
       }catch(error){
         if(error == 'LOGIN_FAIL') {
          console.log(error)
          Alert.alert(
            "ERROR",
            'Login failed. Please check your account information and try again',
            [
              {text: 'Ok', onPress:()=>this.refs.loading.endLoading()},
            ],
            { cancelable: false }
          )
         } else {
           return
         } 
       }
  }

  render() {
    return (
      <View style={styles.container}>
        <Loading ref="loading" size={60}/>
        <Image style={{

          marginTop:Settings.getY(102),
          width:Settings.getX(338),
          height:Settings.getX(338)/338*94,

        }}

        source={require('./image/MCFLogosmall.png')}
        />
      <TextInput
        style={{
          marginTop:Settings.getY(122),
          width:Settings.getX(314),
          fontSize:20,
          color:'white'
        }}
        onChangeText={(merchantId) => this.setState({merchantId})}
        value={this.state.merchantId}
        placeholder="MerchantID"
        placeholderTextColor='#6D6E71'
        underlineColorAndroid='#C49A6C'
      />

      <TextInput
        style={{
          marginTop:Settings.getY(30),
          width:Settings.getX(314),
          fontSize:20,
          color:'white'
        }}
        onChangeText={(username) => this.setState({username})}
        value={this.state.username}
        placeholder="Username"
        placeholderTextColor='#6D6E71'
        underlineColorAndroid='#C49A6C'
      />

      <TextInput
        style={{
          marginTop:Settings.getY(30),
          width:Settings.getX(314),
          fontSize:20,
          color:'white'
        }}
        secureTextEntry={true}
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
        placeholder="Password"
        placeholderTextColor='#6D6E71'
        underlineColorAndroid='#C49A6C'
      />

      <TouchableOpacity style={{
          marginTop:Settings.getY(138),
          width:Settings.getX(250),
          height:Settings.getX(250)/250*75,
          alignItems: 'center',
          backgroundColor:'#2f3038',
          borderRadius: 8,
          justifyContent:'center',
          borderColor:'#C49A6C',
          borderWidth:1
        }}
        activeOpacity={0.4}
        onPress={() => this.login(this.state.merchantId, this.state.username, this.state.password)}>
        <Text style={{fontSize:28,color:'#C49A6C'}}
        >
        Login
        </Text>
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
