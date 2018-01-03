import PayAPI from './PayAPI';
import DeviceInfo from 'react-native-device-info';
var  UUID = DeviceInfo.getUniqueID();export default  {
  async preCreateAuthpay(channel,amount){
    try {
      const device_id = 'aaaa';
      console.log(channel,amount,device_id)
      amount = parseInt(amount * 100,10);
      console.log(channel,amount,device_id);
      const prePayInfo = await PayAPI.preCreateAuthpay(channel,amount,device_id);
      if(prePayInfo.ev_error == "0" ){

         const eo_data =prePayInfo.ev_data;
         return eo_data;
      }else{
        const errorMessage = prePayInfo.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      const errorMessage = 'error1';
      throw errorMessage
    }

  }
}
