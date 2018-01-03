import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  DatePickerAndroid,
  Alert
} from 'react-native';
import Settings from '../../Config/Setting';
import TransactionModule from '../../Module/Transaction/TransactionModule';
import Loading from '../Loading';

const {height, width} = Dimensions.get('window');

export default class OrderList extends Component {
  static navigatorStyle = {
    navBarTextColor:"#c49a6c",
    navBarBackgroundColor:"#2f3038",
    navBarButtonColor:"#c49a6c"
  }
  constructor(){
    super();
    this.state={
      searchHisButtonName:'Search',
      searchTodayButtonName:'Today',
      printButtonName:'Print',
      startTitle:'Start',
      endTitle:'End',
      startDate:'YYYY/MM/DD',
      endDate:'YYYY/MM/DD',
      list: [],
      waiting: false,
      "page_num" :1,
      "page_size":50,
    }
    this.setDate = this.setDate.bind(this);
  }
  async getHistoryTransaction(page_num, page_size) {
          const pageNum = this.state.page_num;
          const pageSize = this.state.page_size;
       try{
        this.refs.loading.startLoading();
        const startTime = this.state.startDate;
        const endTime = this.state.endDate;
        const data = await TransactionModule.getHistoryTransaction(startTime,pageNum,endTime,pageSize);
        this.refs.loading.endLoading();
          console.log(data)
          this.setState({
            list: data
          })
       }catch(error){
         console.log(error)
         Alert.alert(
           "ERROR",
           error,
           [
             {text: "OK", onPress: () => this.refs.loading.endLoading()},
           ],
           { cancelable: false }
         )
       }
  }
  async getTodayTransaction(page_num, page_size){
          const pageNum = this.state.page_num;
          const pageSize = this.state.page_size;
          try{
            this.refs.loading.startLoading();
            const data = await TransactionModule.getTodayTransaction(pageNum,pageSize);
            this.refs.loading.endLoading();
              console.log(data)
              this.setState({
                list: data
              })
          }catch(error){
            console.log(error)
            Alert.alert(
              "ERROR",
              error,
              [
                {text: "OK", onPress: () => this.refs.loading.endLoading()},
              ],
              { cancelable: false }
            )
          }
  }
  render(){
    return(
      <View style={styles.container}>
        <Loading ref="loading" size={60}/>
        <View style={styles.body}>
          {this.renderSelectDate()}
          {this.renderListFunction()}
          {this.renderDetialList()}
        </View>
      </View>
    )
  }
  renderSelectDate(){
    return(
      <View style={styles.timeView} >

        <TouchableOpacity style={[{marginLeft: Settings.getX(30),
           marginRight: Settings.getX(10),
           paddingLeft:10},
           styles.timeSelectButton]}
                      onPress={()=>this.openDatePicker('start','YYYY/MM/DD')}>
            <Text style={{
              fontSize:15,
               color:'#C49A6C',
               fontFamily:'Noto Sans CJK SC'
            }}>{this.state.startTitle}</Text>
            <Text style={{fontSize:15,
              color:'#6D6E71',
              fontFamily:'Noto Sans CJK SC',
              marginLeft:5,
          }}>{this.state.startDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{
          marginRight: Settings.getX(30),
          marginLeft: Settings.getX(10),
          paddingLeft:10},styles.timeSelectButton]}
                      onPress={()=>this.openDatePicker('end','YYYY/MM/DD')}>
            <Text style={{fontSize:15, color:'#C49A6C', fontFamily:'Noto Sans CJK SC'}}>{this.state.endTitle}</Text>
            <Text style={{fontSize:15, color:'#6D6E71', fontFamily:'Noto Sans CJK SC',marginLeft:5}}>{this.state.endDate}</Text>
        </TouchableOpacity>

      </View>
    )
  }
  setDate(dateType,dateStr) {
    if(dateType == 'start'){
      this.setState({
        startDate: dateStr,
      })
      console.log(startDate)
    }else{
      this.setState({
        endDate: dateStr,
      })
      console.log(endDate)

    }
  }
  async openDatePicker(dateType, date){
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(date)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        //return date = new Date(year,month, day).getTime() / 1000;
        month = month + 1;
        dateString = year + '/' + month + '/' + day;
        console.log(month)
        this.setDate(dateType,dateString)
      }
    } catch ({code, message}) {
      console.log(message)
    }

  }
  renderListFunction(){
    return(
      <View style={styles.listFunctionView}>
        <View style={{flex:0.7, paddingTop:Settings.getY(40)}}>
          <Text style={{fontSize:18, fontFamily: 'Noto Sans CJK SC', color:'#C49A6C'}}>
            Total amount：{this.state.list.length}
          </Text>
        </View>
        <TouchableOpacity style={styles.searchButtonStyle}
        onPress={() => this.getTodayTransaction()}>
            <Image source={require('./image/search.png')} style={{
              width:Settings.getX(26), height:Settings.getY(26)}} />
            <Text style={styles.searchButtonFont}>
              {this.state.searchTodayButtonName}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButtonStyle}
        onPress={() => this.getHistoryTransaction()}>
            <Image source={require('./image/search.png')} style={{
              width:Settings.getX(26), height:Settings.getY(26)}} />
            <Text style={styles.searchButtonFont}>
              {this.state.searchHisButtonName}
            </Text>
        </TouchableOpacity>
        
      </View>
    )
  }
  renderListTitle(){
    return(
      <View style={styles.listTitles}>
        <View style={{flex:0.47, alignItems:'center'}}>
          <Text style={styles.listTitleFont}>Order#</Text>
        </View>
        <View style={{flex:0.32, alignItems:'center'}}>
          <Text style={styles.listTitleFont}>Date</Text>
        </View>
        <View style={{flex:0.21, alignItems:'center'}}>
          <Text style={styles.listTitleFont}>Amount</Text>
        </View>
      </View>
    )
  }
  renderDetialList(){
    return(
      <View style={styles.listDetailView}>
        {this.renderListTitle()}
        <View style={{flex:0.9}}>
          <ScrollView style={{flex:0.9,height:400, width: width}}>
            {this.renderRecords()}
          </ScrollView>

        </View>
      </View>
    )
  }
  renderRecords(){
    return this.state.list.map((record, index)=>{
      return(
        <View style={styles.recordView}
                key={index}>
          <View style={{flex:0.47, marginLeft:15, alignItems:'center'}}>
            <Text style={styles.recordTitleFont}>{record.ref_id}</Text>
          </View>
          <View style={{flex:0.32,paddingLeft:10, alignItems:'center'}}>
            <Text style={styles.recordTitleFont}>{record.time}</Text>
          </View>
          <View style={{flex:0.21, marginRight:15, alignItems:'center'}}>
            <Text style={styles.recordTitleFont}>{record.amount_in_cent}</Text>
          </View>
        </View>
      )
    })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body:{
    flex:1,
    width:width,
    backgroundColor:'#2F3038',
  },
  timeView:{
    flexDirection:'row',
    flex:0.1,
  },
  timeSelectButton:{
    flex:0.5,
    marginTop: Settings.getY(25),
    borderColor: '#C49A6C',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection:'row',
    alignItems:'center'
  },
  listFunctionView:{
    flexDirection:'row',
    marginHorizontal:Settings.getX(20),
    flex:0.1,
  },
  searchButtonStyle:{
    backgroundColor:'#2F3038',
    flex:0.3,
    borderRadius: 8,
    marginLeft:Settings.getY(20),
    marginRight: Settings.getY(20),
    marginTop:Settings.getY(20),
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderWidth:1,
    borderColor:'#C49A6C'
  },
  searchButtonFont:{
    fontSize:15,
    fontFamily: 'Noto Sans CJK SC',
    color: '#C49A6C'
  },
  listDetailView:{
    flex:0.8,
  },
  listTitles:{
    flexDirection:'row',
    flex:0.1,
    marginHorizontal: Settings.getX(20),
    paddingTop:Settings.getY(30),
    justifyContent:'center',
  },
  listTitleFont:{
    fontSize:15,
    fontFamily:'Noto Sans CJK SC',
    fontWeight: 'bold',
    color:'#C49A6C',
    justifyContent:'center',
  },
  recordView:{
    height:50,
    width:width-10,
    flexDirection:'row',
    borderColor:'grey',
    borderBottomWidth:1,
    marginHorizontal:5,
    paddingTop:Settings.getY(20),
    paddingBottom:Settings.getY(18)
  },
  recordTitleFont:{
    fontSize:15,
    fontFamily:'Noto Sans CJK SC',
    color:'#C49A6C',
    alignItems:'center',
    justifyContent:'center',
  },
  printButtonView:{
    flex:0.1,
    justifyContent:'center',
  },
  printButtonStyle:{
    marginLeft:280,
    marginRight:20,
    backgroundColor:'#2F3038',
    width:60,
    flex:1,
    borderRadius: 8,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#C49A6C'
  },
  printButtonFont:{
    fontSize:15,
    color:'#C49A6C'
  }
});
