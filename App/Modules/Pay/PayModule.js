import PayAPI from './PayAPI';
import DeviceInfo from 'react-native-device-info';
export default  {
  async preCreateAuthpay(token,channel,amount, tips){
    try {
      let tipAmount = parseInt(tips*100,10);
      const device_id = DeviceInfo.getSerialNumber();
      console.log(channel,amount,device_id)
      amount = parseInt(amount * 100,10);
      console.log(channel,amount,device_id);
      const prePayInfo = await PayAPI.preCreateAuthpay(token,channel,amount,device_id, tipAmount);
      console.log(prePayInfo);
      if(prePayInfo.ev_error == "0" ){
         const eo_data =prePayInfo.ev_data;
         return eo_data;
      }else{
        const errorMessage = prePayInfo.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  }
}
