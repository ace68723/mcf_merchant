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
      amount:123.45,
      order_id: 11728,
      name: '大槐树餐饮有限公司',
      order_number: '11827',
      order_time: '2017-11-14 12:00:00',
      channel: '微信支付',
      rate: 5.2,
      note: ''
    };
    this._roundTwoDig=this._roundTwoDig.bind(this);

  }

  _roundTwoDig(num)
  {
    // var loca=-1

    var total=this.state.totalAmount;
    console.log(total);
    var loca=total.length;
    // console.log(loca);
    // if (num.length>=loca+3)
    // {
    //   num.splice(loca+3,num.length-2-loca);
    // }
    if (total[loca-3]==='.' && num.length>loca)
    {
      console.log(loca);
      console.log(total);
      return;
    }
    this.setState({totalAmount:num});
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{backgroundColor:'white',
                  width:Settings.getX(484),
                  marginTop:Settings.getY(46),
                  height:Settings.getY(500),
                }}>
          <View style={{marginTop:Settings.getY(28),
                        marginLeft:Settings.getY(30),
                        marginRight:30,
                      }}>
            <Text style={{marginLeft:0,
                         fontSize:24,
                         color:'black',
                        }}>
              Total:
            </Text>

            <Text style={{marginLeft:0,
                          fontSize:24,
                          color:'black',
                          marginTop:10}}>
              ${this.state.amount}
            </Text>
          </View>
          <View style={{marginTop:Settings.getY(10),
                        marginLeft:Settings.getY(30),
                        marginRight:30,
                      }}>

            <Text style={{marginLeft:0,
                          fontSize:24,
                          color:'black'
                        }}>
              Note:
            </Text>

          </View>
          <View style={{marginTop:Settings.getY(36),
                        marginLeft:Settings.getX(25),
                        height:Settings.getY(65),
                        width:Settings.getX(420)
                      }}>
            <TextInput
            style={{
              marginLeft:Settings.getX(5),
              fontSize:24,
            }}
              onChangeText={(note) => this.setState(note)}
              value={this.state.note}
              placeholder=""
              underlineColorAndroid='#D1D3D4'
              keyboardType="numeric"
            />
          </View>
          <View style={{
            width:Settings.getX(484),
            height:Settings.getY(200),
            alignItems:'center',
          }}>

          <TouchableOpacity style={{
            marginTop:Settings.getY(40),
            }}
            activeOpacity={0.4}
            onPress={()=>{}}>
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
    backgroundColor:'#2F3038',
    alignItems: 'center',
  },
});
